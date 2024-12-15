const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  text: String
});

const MovieModel = mongoose.model('Movie', movieSchema);

module.exports = MovieModel; 