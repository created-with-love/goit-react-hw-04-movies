import { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SearchForm.scss';

export default function SearchForm({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleFromInput = e => {
    setQuery(e.target.value);
  };

  const notify = () =>
    toast.warn('🦄 Input some text!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const onFromSubmit = e => {
    e.preventDefault();

    if (!query) {
      notify();
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <>
      <form onSubmit={onFromSubmit} className="search-form">
        <input
          type="text"
          value={query}
          name="form-input"
          onChange={handleFromInput}
          className="form-input"
        />

        {/* Same as */}
        <ToastContainer />
        <button type="submit" className="form-btn">
          Search
        </button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
