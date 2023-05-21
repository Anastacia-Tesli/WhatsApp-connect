import { useState } from 'react';
import Dialog from '../Dialog/Dialog';
import Dialogs from '../Dialogs/Dialogs';
import styles from './Chat.module.scss';

const Chat = ({ id, token }) => {
  const [tel, setTel] = useState('');
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <Dialogs token={token} id={id} tel={tel} setTel={setTel} />
        {/* По мере расширения приложения с возможностью добавления нескольких получателей роутинг может также быть использован для отображения текущего диалога в компоненте Dialog*/}
        <Dialog token={token} id={id} tel={tel} />
      </div>
    </div>
  );
};

export default Chat;
