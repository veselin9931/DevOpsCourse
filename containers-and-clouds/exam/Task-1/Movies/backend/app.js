const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const Movie = require('./models/movie');

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs', 'access.log'),
  { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/movies', async (req, res) => {
  console.log('TRYING TO FETCH MOVIES');
  try {
    const movies = await Movie.find();
    res.status(200).json({
      movies: movies.map((movie) => ({
        id: movie.id,
        text: movie.text,
      })),
    });
    console.log('FETCHED MOVIES');
  } catch (err) {
    console.error('ERROR FETCHING MOVIES');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to load movies.' });
  }
});

app.post('/movies', async (req, res) => {
  console.log('TRYING TO STORE MOVIE');
  const movieText = req.body.text;

  if (!movieText || movieText.trim().length === 0) {
    console.log('INVALID INPUT - NO TEXT');
    return res.status(422).json({ message: 'Invalid movie text.' });
  }

  const movie = new Movie({
    text: movieText,
  });

  try {
    await movie.save();
    res
      .status(201)
      .json({ message: 'Movie saved', movie: { id: movie.id, text: movieText } });
    console.log('STORED NEW MOVIE');
  } catch (err) {
    console.error('ERROR FETCHING MOVIES');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to save movie.' });
  }
});

app.delete('/movies/:id', async (req, res) => {
  console.log('TRYING TO DELETE MOVIE');
  try {
    await Movie.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Deleted movie!' });
    console.log('DELETED MOVIE');
  } catch (err) {
    console.error('ERROR FETCHING MOVIES');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to delete movie.' });
  }
});

mongoose.connect(
  `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/course-movies?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error('FAILED TO CONNECT TO MONGODB');
      console.error(err);
    } else {
      console.log('CONNECTED TO MONGODB!!');
      app.listen(80);
    }
  }
);
