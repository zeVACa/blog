import styles from './Likes.module.scss';

function Likes() {
  return (
    <div className={styles.likes}>
      <label htmlFor='likes'>
        <input type='checkbox' name='likes' className={styles.realCheckbox} id='likes' />
        <span className={styles.fakeCheckbox} />
      </label>
      <span className={styles.likesCount}>12</span>
    </div>
  );
}

export default Likes;
