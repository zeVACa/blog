import { ClipLoader } from 'react-spinners';
import styles from './Spinner.module.scss';

function Spinner() {
  return (
    <div className={styles.wrapper}>
      <ClipLoader />
    </div>
  );
}

export default Spinner;
