import { useState } from 'react';
import { TEL_PLACEHOLDER } from '../../utils/constants';
import styles from './Dialogs.module.scss';

const Dialogs = ({ id, tel, setTel }) => {
  const [input, setInput] = useState('');

  const handleAddTel = (e) => {
    e.preventDefault();
    setTel(input);
    setInput('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>Пользователь {id}</div>
      <form onSubmit={handleAddTel} className={styles.form}>
        <input
          value={input || ''}
          className={styles.add_chat}
          placeholder={TEL_PLACEHOLDER}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type='submit' className={styles.button}>
          +
        </button>
      </form>
      {/* Реализовано добавление только одного получателя, т.к. в задании не сказано иначе */}
      {tel ? <div className={styles.chat}>{tel}</div> : null}
    </div>
  );
};

export default Dialogs;
