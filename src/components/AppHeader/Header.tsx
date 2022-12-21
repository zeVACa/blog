import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { logout } from '../../redux/reducers/userSlice';
import { removeTokenFromLocalStorage } from '../../utils/tokenApi';

function Header() {
  const { username, token, image } = useAppSelector((select) => select.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [hasErrorOnImageLoad, setHasErrorOnImageLoad] = useState(false);

  return (
    <div className={styles.header}>
      <Link to={`/articles?page=${searchParams.get('page') || 1}`} className={styles.brand}>
        Realworld Blog
      </Link>
      <div className={styles.right}>
        {token ? (
          <>
            <Link className={styles.createArticleButton} to='/create-article'>
              Create article
            </Link>
            <div className={styles.profile}>
              <Link className={styles.profileName} to='/profile'>
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
                navigate('/');
                toast.info('You have logged out successfully');
              }}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to='/sign-in' className={styles.signInButton}>
              Sign In
            </Link>
            <Link to='/sign-up' className={styles.signUpButton}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
