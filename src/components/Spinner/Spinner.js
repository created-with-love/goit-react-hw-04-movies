import Loader from 'react-loader-spinner';
import React from 'react';
import './Spinner.scss';

export default class App extends React.Component {
  //other logic
  render() {
    return (
      <div className="loader-box">
        <Loader
          type="Oval"
          color="rgba(0, 0, 0, .4)"
          height={100}
          width={100}
          timeout={12000}
        />
      </div>
    );
  }
}
