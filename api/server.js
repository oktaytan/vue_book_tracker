const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const auth = require('./routes/auth');
const books = require('./routes/books');

app.use('/api/auth', auth);
app.use('/api/books', books);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))

