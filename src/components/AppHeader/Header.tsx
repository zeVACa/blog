import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { logout } from '../../redux/reducers/userSlice';
import { removeTokenFromLocalStorage } from '../../utils/tokenApi';
import ERoutes from '../../routes';

function Header() {
  const { username, token, image } = useAppSelector((select) => select.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [hasErrorOnImageLoad, setHasErrorOnImageLoad] = useState(false);

  return (
    <div className={styles.header}>
      <Link
        to={`${ERoutes.ARTICLES}?page=${searchParams.get('page') || 1}`}
        className={styles.brand}
      >
        Realworld Blog
      </Link>
      <div className={styles.right}>
        {token ? (
          <>
            <Link className={styles.createArticleButton} to={ERoutes.CREATE_ARTICLE}>
              Create article
            </Link>
            <div className={styles.profile}>
              <Link className={styles.profileName} to={ERoutes.PROFILE}>
                {username}
                <img
                  src={
                    !hasErrorOnImageLoad && image
                      ? image
                      : 'https://static.productionready.io/images/smiley-cyrus.jpg'
                  }
                  onError={() => {
                    setHasErrorOnImageLoad(true);
                  }}
                  alt='avatar'
                  className={styles.avatar}
                />
              </Link>
            </div>
            <button
              className={styles.logOutButton}
              type='button'
              onClick={() => {
                dispatch(logout());
                removeTokenFromLocalStorage();
                navigate(ERoutes.HOME);
                toast.info('You have logged out successfully');
              }}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to={ERoutes.SIGN_IN} className={styles.signInButton}>
              Sign In
            </Link>
            <Link to={ERoutes.SIGN_UP} className={styles.signUpButton}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
