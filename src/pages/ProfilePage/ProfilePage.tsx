/* eslint-disable jsx-a11y/label-has-associated-control */
import { Input } from 'antd';
import classNames from 'classnames';
import SubmitButton from '../../components/SubmitButton';
import styles from './ProfilePage.module.scss';

function ProfilePage() {
  return (
    <div className={classNames('container', styles.flexCenter)}>
      <form action='' className={styles.form}>
        <h4 className={styles.title}>Edit Profile</h4>
        <label className={styles.label}>
          Username
          <Input placeholder='Username' />
        </label>
        <label className={styles.label}>
          Email address
          <Input placeholder='Email address' />
        </label>
        <label className={styles.label}>
          New password
          <Input placeholder='New password' type='password' />
        </label>
        <label className={styles.label}>
          Avatar image (url)
          <Input placeholder='Avatar image' type='password' />
        </label>
        <div className={styles.submitButton}>
          <SubmitButton title='Save' />
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;
