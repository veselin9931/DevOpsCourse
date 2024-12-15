import React, { useState, useEffect } from 'react';

import MovieInput from './components/movies/MovieInput';
import CourseMovies from './components/movies/CourseMovies';
import ErrorAlert from './components/UI/ErrorAlert';

function App() {
  const [loadedMovies, setLoadedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      setIsLoading(true);

      try {
        const response = await fetch('http://localhost/movies');

        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message || 'Fetching the movies failed.');
        }

        setLoadedMovies(resData.movies);
      } catch (err) {
        setError(
          err.message ||
            'Fetching movies failed - the server responsed with an error.'
        );
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  async function addMovieHandler(movieText) {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost/movies', {
        method: 'POST',
        body: JSON.stringify({
          text: movieText,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Adding the movie failed.');
      }

      setLoadedMovies((prevMovies) => {
        const updatedMovies = [
          {
            id: resData.movie.id,
            text: movieText,
          },
          ...prevMovies,
        ];
        return updatedMovies;
      });
    } catch (err) {
      setError(
        err.message ||
          'Adding a movie failed - the server responsed with an error.'
      );
    }
    setIsLoading(false);
  }

  async function deleteMovieHandler(movieId) {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost/movies/' + movieId, {
        method: 'DELETE',
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Deleting the movie failed.');
      }

      setLoadedMovies((prevMovies) => {
        const updatedMovies = prevMovies.filter((movie) => movie.id !== movieId);
        return updatedMovies;
      });
    } catch (err) {
      setError(
        err.message ||
          'Deleting the movie failed - the server responsed with an error.'
      );
    }
    setIsLoading(false);
  }

  return (
    <div>
      {error && <ErrorAlert errorText={error} />}
      <MovieInput onAddMovie={addMovieHandler} />
      {!isLoading && (
        <CourseMovies movies={loadedMovies} onDeleteMovie={deleteMovieHandler} />
      )}
    </div>
  );
}

export default App;