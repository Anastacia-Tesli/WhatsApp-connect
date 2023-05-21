import { useState } from 'react';
import { api } from '../../utils/api';
import {
  MESSAGE_PLACEHOLDER,
  EMPTY_DIALOG_TEXT,
  REFRESH_DIALOG_BUTTON,
} from '../../utils/constants';
import Message from '../Message/Message';
import styles from './Dialog.module.scss';

const Dialog = ({ tel, id, token }) => {
  const chatId = tel + '@c.us';
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  function sendMessage(e, text) {
    e.preventDefault();
    if (text !== '') {
      api
        .postMessage(chatId, text, id, token)
        .then((data) => {
          setMessages([...messages, { data: { body: data }, message: text, type: 'sent' }]);
          console.log(data);
          console.log(chatId);
        })
        .then(() => {
          setText('');
        })
        .catch((err) => console.log(err));
    }
  }

  function getMessages() {
    const request = () => {
      api
        .getMessage(id, token)
        .then((data) => {
          if (data.body.typeWebhook === 'incomingMessageReceived') {
            setMessages([...messages, { data: data, type: 'incoming' }]);
          } else {
            api.deleteMessage(data.receiptId, id, token);
            request();
          }
          console.log(data);
          api.deleteMessage(data.receiptId, id, token);
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err));
    };
    request();
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {tel ? tel : EMPTY_DIALOG_TEXT}
        {tel ? (
          // Кнопка провоцирует запрос на получение уведомлений. Возможны другие варианты реализации, но в задании не сказано иначе
          <button type='button' className={styles.button} onClick={getMessages}>
            {REFRESH_DIALOG_BUTTON}
          </button>
        ) : null}
      </div>
      <div className={styles.messages}>
        {messages.map((item) => {
          return (
            <Message
              key={item.data.body.idMessage}
              type={item.type}
              text={item.message || item.data.body.messageData.textMessageData.textMessage}
              id={id}
              tel={tel}
            />
          );
        })}
      </div>
      <form className={styles.bottom} onSubmit={(e) => sendMessage(e, text)}>
        <input
          className={styles.new_message}
          placeholder={MESSAGE_PLACEHOLDER}
          value={text || ''}
          onChange={(e) => {
            if (e.target.value !== '' || ' ') {
              setText(e.target.value);
            }
          }}
        />
        <button type='submit' className={styles.button}>
          &gt;
        </button>
      </form>
    </div>
  );
};

export default Dialog;
