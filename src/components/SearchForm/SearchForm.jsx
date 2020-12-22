import { useState } from 'react';
import './SearchForm.scss';

export default function SearchForm({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleFromInput = e => {
    setQuery(e.target.value);
  };

  const onFromSubmit = e => {
    e.preventDefault();

    onSubmit(query);
    setQuery('');
  };

  return (
    <form onSubmit={onFromSubmit}>
      <input
        type="text"
        value={query}
        name="form-input"
        onChange={handleFromInput}
      />
      <button type="submit">Search</button>
    </form>
  );
}
