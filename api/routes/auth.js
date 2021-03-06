const express = require('express');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  const users = await loadUsers();

  const { fullname, username, email, password } = req.body;
  const existFullName = (await users.find({ fullname }).toArray()).length;
  const existUserName = (await users.find({ username }).toArray()).length;
  const existEmail = (await users.find({ email }).toArray()).length;

  if (existFullName > 0 || existUserName > 0 || existEmail > 0) {
    res.status(400).json({ message: 'Bu kullanıcı sistemde kayıtlı.' })
    return false;
  } else {
    const user = {
      fullname: fullname,
      username: username,
      email: email,
      password: password,
      categories: []
    };
    try {
      users.insertOne(user);
      res.status(200).send('Kayıt yapıldı.');
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
})

// Login User
router.post('/login', async (req, res) => {
  const users = await loadUsers();

  const { username, password } = req.body;
  try {
    const user = await users.findOne({ username });
    if (user !== null) {
      if (user.password !== password) {
        res.status(400).json({ message: 'Hatalı şifre' })
      }
      // Create token for user
      jwt.sign(user, 'secretkey', (err, token) => {
        res.json({
          fullname: user.fullname,
          username: user.username,
          email: user.email,
          success: true,
          token
        })
      })

    } else {
      res.status(404).json({ message: 'Kullanıcı kayıtlı değil' })
    }
  } catch (error) {
    res.status(404).json({ message: 'Kullanıcı kayıtlı değil' })
  }
})

// All users
router.get('/', async (req, res) => {
  const data = await loadUsers();
  const infos = await data.find({}).toArray();
  let users = [];
  users = infos.map(info => {
    return {
      _id: info._id,
      fullname: info.fullname,
      username: info.username,
      email: info.email,
      password: info.password,
    }
  })
  res.json(users);
})

// Upload Background
router.post('/upload_bg', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', async (err, authData) => {
    if (err) {
      res.status(403).json({ message: err });
    } else {
      const usersDB = await loadUsers();
      console.log(req.body);
      const user = await usersDB.find({ _id: new mongodb.ObjectID(authData._id) }).toArray();
      await usersDB.updateOne({ _id: new mongodb.ObjectID(authData._id) }, { $set: { background: req.body } });
      const users = await usersDB.find({ _id: new mongodb.ObjectID(authData._id) }).toArray();
      res.status(200).json(users[0]);
    }
  })
})

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

async function loadUsers() {
  const client = await mongodb.MongoClient.connect('mongodb://localhost:27017/vue_book_db',
    { useNewUrlParser: true, useUnifiedTopology: true });

  return client.db('vue_book_db').collection('users');
}

module.exports = router;