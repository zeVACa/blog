/* eslint-disable jsx-a11y/label-has-associated-control */

/* eslint-disable */

import classNames from 'classnames';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SubmitButton from '../../components/SubmitButton';
import { login } from '../../redux/reducers/userSlice';
import { useAppDispatch } from '../../redux/store';
import userApi from '../../services/userApi';
import styles from './RegisterPage.module.scss';
import '../../index.scss';

function RegisterPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({ mode: 'all' });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [registerRequest, { data, isSuccess, error: authError }] = userApi.useRegisterMutation();

  const errorResponse = authError as {
    status: number;
    data: { errors: { username?: string; email?: string } };
  };

  useEffect(() => {
    if (isSuccess && data) {
      const { username, email, token } = data.user;

      toast.success('You have logged in successfully');
      dispatch(login({ username, email, token, image: null }));
      navigate('/');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (authError) {
      const { username: usernameError, email: emailError } = errorResponse.data.errors;

      if (usernameError) toast.error(`Username ${usernameError}`);
      if (emailError) toast.error(`Email ${emailError}`);
    }
  }, [authError]);

  const onSubmitHandle = (submitedData: any) => {
    const { username, email, password } = submitedData;

    registerRequest({ user: { username, email, password } });
  };

  return (
    <div className={classNames('container', styles.flexCenter)}>
      <form action='' className={styles.form} onSubmit={handleSubmit(onSubmitHandle)}>
        <h4 className={styles.title}>Create new account</h4>
        <label className={styles.label}>
          Username
          <input
            placeholder='Username'
            className={classNames({ 'form-input': true, 'form-input--error': errors.username })}
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
          />
        </label>
        {errors?.username && (
          <p className='form-error-message'>{errors.username?.message?.toString()}</p>
        )}
        {errorResponse?.data.errors.username && (
          <p className='form-error-message'>{`Username ${errorResponse?.data.errors.username}`}</p>
        )}
        <label className={styles.label}>
          Email address
          <input
            placeholder='Email address'
            className={classNames({ 'form-input': true, 'form-input--error': errors.email })}
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
        {errors?.email && <p className='form-error-message'>{errors.email?.message?.toString()}</p>}
        {errorResponse?.data.errors.email && (
          <p className='form-error-message'>{`Email ${errorResponse?.data.errors.email}`}</p>
        )}
        <label className={styles.label}>
          Password
          <input
            placeholder='Password'
            type='password'
            className={classNames({ 'form-input': true, 'form-input--error': errors.password })}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Your password needs to contain minimum 6 characters.',
              },
              maxLength: {
                value: 40,
                message: 'Your password needs to contain maximum 6 characters.',
              },
            })}
          />
        </label>
        {errors?.password && (
          <p className='form-error-message'>{errors.password?.message?.toString()}</p>
        )}
        <label className={styles.label}>
          Repeat Password
          <input
            placeholder='Repeat Password'
            type='password'
            className={classNames({
              'form-input': true,
              'form-input--error': errors.passwordRepeated,
            })}
            {...register('passwordRepeated', {
              required: 'Repeat password field is required',
              validate: (value) => value === String(getValues().password) || 'Passwords must match',
            })}
          />
        </label>
        {errors?.passwordRepeated && (
          <p className='form-error-message'>{errors.passwordRepeated?.message?.toString()}</p>
        )}
        <div className={styles.agreement}>
          <input
            type='checkbox'
            className={styles.checkbox}
            {...register('agreement', { required: 'Agreement is required' })}
            id='agreement-checkbox'
          />
          <label htmlFor='agreement-checkbox'>
            I agree to the processing of my personal information
          </label>
        </div>
        {errors?.agreement && (
          <p className='form-error-message'>{errors.agreement?.message?.toString()}</p>
        )}
        <div className={styles.submitButtonWrapper}>
          <SubmitButton title='Create' />
        </div>
        <p className={styles.alreadyHaveAccount}>
          Already have an account? <Link to='/sign-in'>Sign In</Link>.
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
