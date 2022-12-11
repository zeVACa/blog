/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-control-regex */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SubmitButton from '../../components/SubmitButton';
import styles from './LoginPage.module.scss';
import authApi from '../../services/authApi';
import { useAppDispatch } from '../../redux/store';
import { login } from '../../redux/reducers/userSlice';

function LoginPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur' });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loginRequest, { data, isSuccess, error: authError }] = authApi.useLoginMutation();

  useEffect(() => {
    console.log('data', data);
    if (isSuccess && data) {
      const { username, email, token, image } = data.user;

      toast.success('You have logged in successfully');
      dispatch(login({ username, email, token, image }));
      navigate('/');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (authError) {
      console.log('authError', authError);
      toast.error('Email or password is invalid!');
    }
  }, [authError]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitHandle = (submitedData: any) => {
    console.log('submitedData', submitedData);
    loginRequest({ user: { email: submitedData.email, password: submitedData.password } });
    // reset();
  };

  return (
    <div className={classNames('container', styles.flexCenter)}>
      <form action='' className={styles.form} onSubmit={handleSubmit(onSubmitHandle)}>
        <h4 className={styles.title}>Sign In</h4>
        <label className={styles.label}>
          Email address
          <input
            type='text'
            className={styles.input}
            placeholder='Email address'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value:
                  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                message: 'Enter correct email',
              },
            })}
          />
        </label>
        {errors?.email && <p>{errors.email.message?.toString()}</p>}
        <label className={classNames(styles.label, styles.password)}>
          Password
          <input
            type='password'
            className={styles.input}
            placeholder='Password'
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 4, message: 'Min 4 chars' },
            })}
          />
        </label>
        {errors?.password && <p>{errors.password.message?.toString()}</p>}
        <div className={styles.submitButton}>
          <SubmitButton title='Log in' />
        </div>
        <p className={styles.dontHaveAccount}>
          Don’t have an account? <Link to='/sign-up'>Sign Up</Link>.
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
