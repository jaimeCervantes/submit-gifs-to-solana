import { useState } from 'react';
import styles from './GifForm.module.css';

export default function GifForm({ onSubmit }) {
  const [value, setValue] = useState('');

  return (
    <section className={styles.GifForm}>
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
        setValue('');
      }}>
        <input
          className={styles.field}
          type="text"
          placeholder="Enter gif Link!"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
        <button className={`cta-button ${styles.btn} ${styles.btnSubmit}`}>
          Submit
        </button>
      </form>
    </section>
  );
}