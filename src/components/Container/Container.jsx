import React from 'react';
import PropTypes from 'prop-types';
import './Container.scss';

export default function Container({ children }) {
  return <div className="container">{children}</div>;
}

Container.propTypes = {
  children: PropTypes.node,
};
