/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import SubmitButton from '../../components/SubmitButton';
import styles from './ProfilePage.module.scss';
import '../../index.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import userApi from '../../services/userApi';
import { setUser } from '../../redux/reducers/userSlice';

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

  const [editProfileRequest, { data, isSuccess, error: editError }] = userApi.useEditUserMutation();

  const dispatch = useAppDispatch();
  const editErrorResponse = editError as {
    status: number;
    data: { errors: { username?: string; email?: string } };
  };

  useEffect(() => {
    if (username && email)
      reset({
        username,
        email,
        password: '',
        avatar: image || '',
      });
  }, [username, email, image]);

  useEffect(() => {
    if (isSuccess && data) {
      const {
        username: usernameResponse,
        email: emailResponse,
        token: tokenResponse,
        image: imageResponse,
      } = data.user;

      toast.success('Users data has updated successfully!');
      dispatch(
        setUser({
          username: usernameResponse,
          email: emailResponse,
          token: tokenResponse,
          image: imageResponse,
        }),
      );
      reset({
        username: usernameResponse,
        email: emailResponse,
        password: '',
        avatar: imageResponse || '',
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (editErrorResponse) {
      const { username: usernameError, email: emailError } = editErrorResponse.data.errors;

      if (usernameError) toast.error(`Username ${usernameError}`);
      if (emailError) toast.error(`Email ${emailError}`);
    }
  }, [editErrorResponse]);

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

  const onSubmitHandle = (submitedData: {
    username: string;
    email: string;
    password: string;
    avatar: string;
  }) => {
    const {
      username: usernameSubmited,
      email: emailSubmited,
      password: passwordSubmited,
      avatar: avatarSubmited,
    } = submitedData;

    editProfileRequest({
      user: {
        username: usernameSubmited,
        email: emailSubmited,
        password: passwordSubmited,
        image: avatarSubmited,
      },
    });
  };

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
            defaultValue={username || ''}
          />
        </label>
        {errors?.username && (
          <p className='form-error-message'>{errors.username?.message?.toString()}</p>
        )}
        {editErrorResponse?.data.errors.username && (
          <p className='form-error-message'>{`Username ${editErrorResponse?.data.errors.username}`}</p>
        )}
        <label className={styles.label}>
          Email address
          <input
            placeholder='Email address'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value:
                  // eslint-disable-next-line no-control-regex
                  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                message: 'Enter correct email',
              },
            })}
            className={classNames({ 'form-input': true, 'form-input--error': errors.email })}
            defaultValue={email || ''}
          />
        </label>
        {errors?.email && <p className='form-error-message'>{errors.email?.message?.toString()}</p>}
        {editErrorResponse?.data.errors.email && (
          <p className='form-error-message'>{`Email ${editErrorResponse?.data.errors.email}`}</p>
        )}
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
                message: 'Your password needs to contain maximum 40 characters.',
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

              if (e.currentTarget.value !== '') {
                setHasErrorOnImageLoad(false);
                setIsImageLoading(true);
              }
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
        {watch().avatar !== '' && !errors?.avatar && (
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
        {!hasErrorOnImageLoad &&
          !isFormDataEqualsStoreUserData &&
          !isImageLoading &&
          watch().avatar !== '' && (
            <p className={styles.imageLoadingSuccessMessage}>Image URL is correct!</p>
          )}
        {isImageLoading && !hasErrorOnImageLoad && watch().avatar && <p>Image loading...</p>}
        <div className={styles.submitButton}>
          <SubmitButton
            title='Save'
            disabled={
              !isValid ||
              (isFormDataEqualsStoreUserData && !editErrorResponse) ||
              hasErrorOnImageLoad ||
              isImageLoading
            }
          />
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;
