import { Link } from 'react-router-dom';
import ERoutes from '../../routes';
import styles from './NotFoundPage.module.scss';

function NotFoundPage() {
  return (
    <div className={styles.wrapper}>
      <div>
        <h2 className={styles.notFoundCode404}>404</h2>
        <h5>
          Page Not Found. Go to{' '}
          <Link to={ERoutes.HOME} className={styles.homePageLink}>
            Home Page
          </Link>
        </h5>
      </div>
    </div>
  );
}

export default NotFoundPage;
