import styles from './Login.module.scss';

const Login = ({ setLogged, setToken, setId }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setLogged(true);
  };
  return (
    <div className={styles.container}>
      <div className={styles.window}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <span>Введите свои данные</span>
          <label className={styles.label}>
            idInstance
            <input className={styles.input} onChange={(e) => setId(e.target.value)} required />
          </label>
          <label className={styles.label}>
            apiTokenInstance
            <input className={styles.input} onChange={(e) => setToken(e.target.value)} required />
          </label>
          <button className={styles.button} type='submit'>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
