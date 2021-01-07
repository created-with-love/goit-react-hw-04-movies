import React from 'react';
import Navigation from '../Navigation';
import './Appbar.scss';

const Appbar = React.memo(() => {
  return (
    <header className="header">
      <Navigation />
    </header>
  );
});

export default Appbar;
