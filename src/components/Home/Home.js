import { useState } from 'react';
import Login from '../Login/Login';
import Chat from '../Chat/Chat';

import styles from './Home.module.scss';

const Home = () => {
  // Не сохраняем данные пользователя в стор браузера, т.к. не предусмотен логаут с удалением этих данных
  // Для простоты храним все данные в стейт-переменных

  const [logged, setLogged] = useState(false);
  const [id, setId] = useState('');
  const [token, setToken] = useState('');

  return (
    <div className={styles.container}>
      {/* Переходим в чат только после ввода учетных данных в форме логина
    Для достижения простоты интерфейса не использован роутинг, стоит его добавить при расширении приложения на несколько страниц */}
      {!logged ? (
        <Login setLogged={setLogged} setId={setId} setToken={setToken} />
      ) : (
        <Chat token={token} id={id} />
      )}
    </div>
  );
};

export default Home;
