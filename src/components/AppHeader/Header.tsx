import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './Header.module.scss';
import defaultAvatar from '../../images/avatar.png';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { logout } from '../../redux/reducers/userSlice';

function Header() {
  const { username, image } = useAppSelector((select) => select.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <Link to='/' className={styles.brand}>
        Realworld Blog
      </Link>
      <div className={styles.right}>
        {username ? (
          <>
            <Link className={styles.createArticleButton} to='/create-article'>
              Create article
            </Link>
            <div className={styles.profile}>
              <Link className={styles.profileName} to='/profile'>
                {username}
                {image && (
                  <img src={image || defaultAvatar} alt='avatar' className={styles.avatar} />
                )}
              </Link>
            </div>
            <button
              className={styles.logOutButton}
              type='button'
              onClick={() => {
                dispatch(logout());
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
