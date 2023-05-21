import styles from './Message.module.scss';

const Message = ({ tel, id, type, text }) => {
  return (
    <div className={`${styles.message} ${styles[`message_${type}`]}`}>
      <span className={styles.author}>{type === 'incoming' ? tel : id}</span>
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default Message;
