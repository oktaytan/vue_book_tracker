const express = require('express');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const uuid = require('uuid')

const router = express.Router();

// Get all books
router.get('/', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', async (err, authData) => {
    if (err) {
      res.status(403).json({ message: err });
    } else {
      const booksDB = await loadBooks();
      const books = await booksDB.find({ _id: new mongodb.ObjectID(authData._id) }).toArray();
      res.status(200).json(books[0].categories);
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
      const books = await booksDB.find({ _id: new mongodb.ObjectID(authData._id) }).toArray();
      const categoryIndex = books[0].categories.findIndex(cat => cat.category === req.body.category);
      if (categoryIndex > -1) {
        res.sendStatus(400);
      } else {
        await booksDB.updateOne({ _id: new mongodb.ObjectID(authData._id) }, { $addToSet: { categories: req.body } });
        const books = await booksDB.find({ _id: new mongodb.ObjectID(authData._id) }).toArray();
        res.status(200).json(books[0].categories);
      }
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
      const books = await booksDB.find({ _id: new mongodb.ObjectID(authData._id) }).toArray();
      res.status(200).json(books[0].categories);
    }
  })
});

// Add Book
router.post('/category/:id', verifyToken, async (req, res) => {
  jwt.verify(req.token, 'secretkey', async (err, authData) => {
    if (err) {
      res.status(403).json({ message: err });
    } else {
      const booksDB = await loadBooks();
      const user = await booksDB.find({ _id: new mongodb.ObjectID(authData._id) }).toArray();
      let categories = await user[0].categories;
      const categoryIndex = categories.findIndex(item => item.category === req.body.book.category);
      if (categoryIndex > -1) {
        categories[categoryIndex].books.push(req.body.book);
      } else {
        categories.push({
          category_id: uuid.v4(),
          category: req.body.book.category,
          books: [
            req.body.book
          ]
        })
      }
      await booksDB.updateOne({ _id: new mongodb.ObjectID(authData._id) }, { $set: { categories: categories } });
      const books = await booksDB.find({ _id: new mongodb.ObjectID(authData._id) }).toArray();
      res.status(200).json(books[0].categories);
    }
  })
})

// Update Book
router.post('/category/:category_id/update/:book_id', verifyToken, async (req, res) => {
  jwt.verify(req.token, 'secretkey', async (err, authData) => {
    if (err) {
      res.status(403).json({ message: err });
    } else {
      const booksDB = await loadBooks();
      const user = await booksDB.find({ _id: new mongodb.ObjectID(authData._id) }).toArray();
      let categories = await user[0].categories;
      let selectedCategoryIndex = categories.findIndex(item => item.category_id === req.params.category_id);
      let selectedCategory = categories.filter(item => item.category_id === req.params.category_id);
      let bookIndex = selectedCategory[0].books.findIndex(book => book.book_id === req.params.book_id);
      selectedCategory[0].books.splice(bookIndex, 1, req.body);
      categories.splice(selectedCategoryIndex, 1, selectedCategory[0]);
      await booksDB.updateOne({ _id: new mongodb.ObjectID(authData._id) }, { $set: { categories: categories } });
      const books = await booksDB.find({ _id: new mongodb.ObjectID(authData._id) }).toArray();
      res.status(200).json(books[0].categories);
    }
  })
})


// Delete & Change Read Book
router.post('/category/:category_id/book/:book_id', verifyToken, async (req, res) => {
  jwt.verify(req.token, 'secretkey', async (err, authData) => {
    if (err) {
      res.status(403).json({ message: err });
    } else {
      const booksDB = await loadBooks();
      const user = await booksDB.find({ _id: new mongodb.ObjectID(authData._id) }).toArray();
      let categories = await user[0].categories;
      let selectedCategoriesIndex = categories.findIndex(item => item.category_id === req.params.category_id);
      let selectedCategories = categories.filter(item => item.category_id === req.params.category_id);
      if (req.body.delete) {
        selectedCategories[0].books = selectedCategories[0].books.filter(book => book.book_id !== req.params.book_id);
      } else {
        const bookIndex = selectedCategories[0].books.findIndex((book) => book.book_id === req.params.book_id);
        const book = selectedCategories[0].books.find((book) => book.book_id === req.params.book_id);
        book.isRead = !book.isRead;
        selectedCategories[0].books.splice(bookIndex, 1, book);
      }
      categories.splice(selectedCategoriesIndex, 1, selectedCategories[0]);
      await booksDB.updateOne({ _id: new mongodb.ObjectID(authData._id) }, { $set: { categories: categories } });
      const books = await booksDB.find({ _id: new mongodb.ObjectID(authData._id) }).toArray();
      res.status(200).json(books[0].categories);
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