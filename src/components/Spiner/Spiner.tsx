import { ClipLoader } from 'react-spinners';
import styles from './Spiner.module.scss';

function Spiner() {
  return (
    <div className={styles.wrapper}>
      <ClipLoader />
    </div>
  );
}

export default Spiner;
