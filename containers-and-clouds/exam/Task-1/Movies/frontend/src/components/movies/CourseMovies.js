import React from 'react';

import './CourseMovies.css';
import Card from '../UI/Card';
import MovieItem from './MovieItem';

function CourseMovies(props) {
  const hasNoMovies = !props.movies || props.movies.length === 0;

  return (
    <section id='course-movies'>
      <Card>
        <h2>Your Movies UP</h2>
        {hasNoMovies && <h2>No movies found. Start adding some!</h2>}
        <ul>
          {props.movies.map((movie) => (
            <MovieItem
              key={movie.id}
              id={movie.id}
              text={movie.text}
              onDelete={props.onDeleteMovie}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}

export default CourseMovies;
