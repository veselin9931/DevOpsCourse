import React, { useState } from 'react';

import './MovieInput.css';
import Card from '../UI/Card';

function MovieInput(props) {
  const [enteredMovieText, setEnteredMovieText] = useState('');

  function updateMovieTextHandler(event) {
    setEnteredMovieText(event.target.value);
  }

  function movieSubmitHandler(event) {
    event.preventDefault();

    if (enteredMovieText.trim().length === 0) {
      alert('Invalid text - please enter a longer one!');
      return;
    }

    props.onAddMovie(enteredMovieText);

    setEnteredMovieText('');
  }

  return (
    <section id='movie-input'>
      <Card>
        <form onSubmit={movieSubmitHandler}>
          <label htmlFor='text'>New Movie</label>
          <input
            type='text'
            id='text'
            value={enteredMovieText}
            onChange={updateMovieTextHandler}
          />
          <button>Add Movie</button>
        </form>
      </Card>
    </section>
  );
}

export default MovieInput;
