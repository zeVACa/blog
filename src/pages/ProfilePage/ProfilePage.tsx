/* eslint-disable jsx-a11y/label-has-associated-control */

/* eslint-disable */

import classNames from 'classnames';
import SubmitButton from '../../components/SubmitButton';
import styles from './ProfilePage.module.scss';
import '../../index.scss';
import { useAppSelector } from '../../redux/store';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

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

  const [hasErrorOnImageLoad, setHasErrorOnImageLoad] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  useEffect(() => {
    if (username && email)
      reset({
        username,
        email,
        password: '',
        avatar: image || '',
      });
  }, [username, email, image]);

  const isFormDataEqualsStoreUserData =
    watch().username === username &&
    watch().email === email &&
    (watch().avatar === image || (watch().avatar === '' && image === null)) &&
    watch().password === '';

  const avatarRegister = {
    ...register('avatar', {
      pattern: {
        value:
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
        message: 'Incorrect address',
      },
    }),
  };

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
              pattern: {
                value: /^[a-z][a-z0-9]*$/,
                message: 'You can only use lowercase English letters and numbers',
              },
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
            {...avatarRegister}
            onChange={(e) => {
              avatarRegister.onChange(e);
              setIsImageLoading(true);
            }}
            className={classNames({ 'form-input': true, 'form-input--error': errors.avatar })}
            defaultValue={image || ''}
          />
        </label>
        {errors?.avatar && (
          <p className='form-error-message'>{errors.avatar?.message?.toString()}</p>
        )}
        {isFormDataEqualsStoreUserData && (
          <p className={styles.editYourDataMessage}>Edit your data to save changes</p>
        )}
        {watch().avatar === '' && image && (
          <p className={styles.editYourDataMessage}>
            If you make the avatar field empty, then your current image will be deleted and replaced
            with a default image
          </p>
        )}
        {watch().avatar && (
          <img
            src={watch().avatar}
            onLoad={() => {
              setIsImageLoading(false);
              setHasErrorOnImageLoad(false);
            }}
            onError={() => {
              setIsImageLoading(false);
              setHasErrorOnImageLoad(true);
            }}
            className='sr-only'
          />
        )}
        {!errors?.avatar &&
          hasErrorOnImageLoad &&
          !isFormDataEqualsStoreUserData &&
          !isImageLoading && (
            <p className={styles.imageLoadingErrorMessage}>
              An error occurred while loading the image! Your link may point to a non-existent
              image. Please fill in another image URL
            </p>
          )}
        {!hasErrorOnImageLoad && !isFormDataEqualsStoreUserData && !isImageLoading && (
          <p className={styles.imageLoadingSuccessMessage}>Image URL is correct!</p>
        )}
        {isImageLoading && !hasErrorOnImageLoad && <p>Image loading...</p>}
        <div className={styles.submitButton}>
          <SubmitButton
            title='Save'
            disabled={
              !isValid || isFormDataEqualsStoreUserData || hasErrorOnImageLoad || isImageLoading
            }
          />
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;
