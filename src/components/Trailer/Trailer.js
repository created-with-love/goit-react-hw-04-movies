import React, { useState, useEffect } from 'react';
import './Trailer.scss';

export default function Trailer({ id }) {
  const ApiKey = '7f0b5ab01080cb0bb4b9db0d9bc41efa';
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${ApiKey}&language=en-US`;

  const [src, setSrc] = useState('');

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const id = data.results[0].key;
        setSrc(`https://www.youtube.com/embed/${id}`);
      })
      .catch(() => {
        setSrc(`http://www.youtube.com/embed/zwBpUdZ0lrQ`);
      });
  });

  return (
    <div className="trailer-box">
      <iframe
        width="560"
        height="315"
        src={src}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="trailer"
      ></iframe>
    </div>
  );
}
