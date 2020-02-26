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