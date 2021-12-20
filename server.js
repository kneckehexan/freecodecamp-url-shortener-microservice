require('dotenv').config();
require('express-async-errors');

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express');
const app = express();


// Connect DB
const connectDB = require('./db/connectDB');

// Routers
const urlRouter = require('./routes/url');

// Error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));
app.use(helmet());
app.use(cors());
app.use(xss());

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// Routes
app.use('/public', express.static(`${process.cwd()}/public`));
app.use('/api/shorturl', urlRouter);

app.use(notFoundMiddleware);
//app.use(errorHandlerMiddleware);

// Basic Configuration
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Listening on port ${port}...`)
    })
  } catch(error){
    console.error(error);
  }
}

start();