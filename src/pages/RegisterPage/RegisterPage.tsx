/* eslint-disable jsx-a11y/label-has-associated-control */
import { Input } from 'antd';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import SubmitButton from '../../components/SubmitButton';
import styles from './RegisterPage.module.scss';

function RegisterPage() {
  return (
    <div className={classNames('container', styles.flexCenter)}>
      <form action='' className={styles.form}>
        <h4 className={styles.title}>Create new account</h4>
        <label className={styles.label}>
          Username
          <Input placeholder='Username' />
        </label>
        <label className={styles.label}>
          Email address
          <Input placeholder='Email address' />
        </label>
        <label className={styles.label}>
          Password
          <Input placeholder='Password' type='password' />
        </label>
        <label className={styles.label}>
          Repeat Password
          <Input placeholder='Repeat Password' type='password' />
        </label>
        <div className={styles.agrement}>
          <input
            type='checkbox'
            name='agrement'
            className={styles.checkbox}
            id='agrement-checkbox'
          />
          <label htmlFor='agrement-checkbox'>
            I agree to the processing of my personal information
          </label>
        </div>
        <SubmitButton title='Create' />
        <p className={styles.alreadyHaveAccount}>
          Already have an account? <Link to='/login'>Sign In</Link>.
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
