/* eslint-disable jsx-a11y/label-has-associated-control */

/* eslint-disable */

import classNames from 'classnames';
import SubmitButton from '../../components/SubmitButton';
import styles from './ProfilePage.module.scss';
import '../../index.scss';
import { useAppSelector } from '../../redux/store';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo } from 'react';

function ProfilePage() {
  const { username, email, image } = useAppSelector((selector) => selector.user);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    mode: 'all',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      avatar: '',
    },
  });

  useEffect(() => {
    if (username && email && image)
      reset({
        username,
        email,
        password: '',
        avatar: image,
      });
  }, [username, email, image]);

  const onSubmitHandle = () => {};

  return (
    <div className={classNames('container', styles.flexCenter)}>
      <form action='' className={styles.form} onSubmit={handleSubmit(onSubmitHandle)}>
        <h4 className={styles.title}>Edit Profile</h4>
        <label className={styles.label}>
          Username
          <input
            placeholder='Username'
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Your username needs to contain minimum 3 characters.',
              },
              maxLength: {
                value: 20,
                message: 'Your username needs to contain maximum 20 characters.',
              },
            })}
            className={classNames({ 'form-input': true, 'form-input--error': errors.username })}
            defaultValue={username ? username : ''}
          />
        </label>
        {errors?.username && (
          <p className='form-error-message'>{errors.username?.message?.toString()}</p>
        )}
        <label className={styles.label}>
          Email address
          <input
            placeholder='Email address'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value:
                  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                message: 'Enter correct email',
              },
            })}
            className={classNames({ 'form-input': true, 'form-input--error': errors.email })}
            defaultValue={email ? email : ''}
          />
        </label>
        {errors?.email && <p className='form-error-message'>{errors.email?.message?.toString()}</p>}
        <label className={styles.label}>
          New password
          <input
            placeholder='New password'
            {...register('password', {
              minLength: {
                value: 6,
                message: 'Your password needs to contain minimum 6 characters.',
              },
              maxLength: {
                value: 40,
                message: 'Your password needs to contain maximum 6 characters.',
              },
            })}
            type='password'
            className={classNames({ 'form-input': true, 'form-input--error': errors.password })}
          />
        </label>
        {errors?.password && (
          <p className='form-error-message'>{errors.password?.message?.toString()}</p>
        )}
        <label className={styles.label}>
          Avatar image (url)
          <input
            placeholder='Avatar image'
            {...register('avatar', {
              pattern: {
                value:
                  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
                message: 'Incorrect address',
              },
            })}
            className={classNames({ 'form-input': true, 'form-input--error': errors.avatar })}
            defaultValue={image ? image : ''}
          />
        </label>
        {errors?.avatar && (
          <p className='form-error-message'>{errors.avatar?.message?.toString()}</p>
        )}
        {(!isValid ||
          (watch().username === username &&
            watch().email === email &&
            watch().avatar === image &&
            watch().password === '')) && (
          <p className={styles.editYourDataMessage}>Edit your data to save changes</p>
        )}
        <div className={styles.submitButton}>
          <SubmitButton
            title='Save'
            disabled={
              !isValid ||
              (watch().username === username &&
                watch().email === email &&
                watch().avatar === image &&
                watch().password === '')
            }
          />
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;
