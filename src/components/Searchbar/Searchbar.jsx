import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import css from './Searchbar.module.css';

export function Searchbar({ onSubmit }) {
  const [inputText, setInputText] = useState('');

  const handleInput = evt => {
    setInputText(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (inputText.trim() === '') {
      alert('Будь-ласка, заповніть поле пошуку');
      return;
    }
    onSubmit(inputText);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <BsSearch size={25} />
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          value={inputText}
          placeholder="Search images and photos"
          onChange={handleInput}
        />
      </form>
    </header>
  );
}
