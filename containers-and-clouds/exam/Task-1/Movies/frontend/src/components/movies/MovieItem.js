import React from 'react';

import './MovieItem.css';

function MovieItem(props) {
  return <li className="movie-item" onClick={props.onDelete.bind(null, props.id)}>{props.text}</li>;
}

export default MovieItem;
