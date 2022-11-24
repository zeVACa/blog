/* eslint-disable jsx-a11y/label-has-associated-control */
import { Input } from 'antd';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import SubmitButton from '../../components/SubmitButton';
import styles from './LoginPage.module.scss';

function LoginPage() {
  return (
    <div className={classNames('container', styles.flexCenter)}>
      <form action='' className={styles.form}>
        <h4 className={styles.title}>Sign In</h4>
        <label className={styles.label}>
          Email address
          <Input placeholder='Email address' />
        </label>
        <label className={classNames(styles.label, styles.password)}>
          Password
          <Input placeholder='Password' />
        </label>
        <div className={styles.submitButton}>
          <SubmitButton title='Log in' />
        </div>
        <p className={styles.dontHaveAccount}>
          Don’t have an account? <Link to='/register'>Sign Up</Link>.
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
