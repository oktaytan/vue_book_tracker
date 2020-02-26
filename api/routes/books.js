const express = require('express');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Get all books
router.get('/', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', async (err, authData) => {
    if (err) {
      res.status(403).json({ message: err });
    } else {
      const booksDB = await loadBooks();
      const books = await booksDB.find({ _id: new mongodb.ObjectID(authData._id) }).toArray();
      res.status(200).json(books);
    }
  })
})

// Add new category
router.post('/', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', async (err, authData) => {
    if (err) {
      res.status(403).json({ message: err });
    } else {
      const booksDB = await loadBooks();
      booksDB.updateOne({ _id: new mongodb.ObjectID(authData._id) }, { $addToSet: { categories: req.body } });
      res.status(200)
    }
  })
});

// Remove category
router.post('/:id', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', async (err, authData) => {
    if (err) {
      res.status(403).json({ message: err });
    } else {
      const booksDB = await loadBooks();
      const user = await booksDB.find({ _id: new mongodb.ObjectID(authData._id) }).toArray();
      let categories = await user[0].categories;
      categories = categories.filter(item => item.category_id !== req.params.id);
      await booksDB.updateOne({ _id: new mongodb.ObjectID(authData._id) }, { $set: { categories: categories } });
      res.status(200)
    }
  })
});

async function loadBooks() {
  const client = await mongodb.MongoClient.connect('mongodb://localhost:27017/vue_book_db',
    { useNewUrlParser: true, useUnifiedTopology: true });

  return client.db('vue_book_db').collection('users');
}

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

module.exports = router;