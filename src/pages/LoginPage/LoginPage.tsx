import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SubmitButton from '../../components/SubmitButton';
import styles from './LoginPage.module.scss';
import userApi from '../../services/userApi';
import { useAppDispatch } from '../../redux/store';
import { setUser } from '../../redux/reducers/userSlice';
import '../../index.scss';
import { setTokenToLocalStorage } from '../../utils/tokenApi';
import ERoutes from '../../routes';

interface IFormInputs {
  email: string;
  password: string;
}

function LoginPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>({ mode: 'all' });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loginRequest, { data, isSuccess, error: authError }] = userApi.useLoginMutation();

  useEffect(() => {
    if (isSuccess && data) {
      const { username, email, token, image } = data.user;

      toast.success('You have logged in successfully');
      dispatch(setUser({ username, email, token, image }));
      setTokenToLocalStorage(token);
      navigate(ERoutes.HOME);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (authError) {
      toast.error('Email or password is invalid!');
    }
  }, [authError]);

  const onSubmitHandle = (submitedData: IFormInputs) => {
    const { email, password } = submitedData;
    loginRequest({ user: { email, password } });
  };

  return (
    <div className={classNames('container', styles.flexCenter)}>
      <form action='' className={styles.form} onSubmit={handleSubmit(onSubmitHandle)}>
        <h4 className={styles.title}>Sign In</h4>
        <label className='form-label'>
          Email address
          <input
            type='text'
            className={classNames({ 'form-input': true, 'form-input--error': errors.email })}
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
        {errors?.email && <p className='form-error-message'>{errors.email.message?.toString()}</p>}
        <label className='form-label'>
          Password
          <input
            type='password'
            className={classNames({ 'form-input': true, 'form-input--error': errors.password })}
            placeholder='Password'
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
            })}
          />
        </label>
        {errors?.password && (
          <p className='form-error-message'>{errors.password.message?.toString()}</p>
        )}
        <div className={styles.submitButton}>
          <SubmitButton title='Log in' />
        </div>
        <p className={styles.dontHaveAccount}>
          Don’t have an account? <Link to={ERoutes.SIGN_UP}>Sign Up</Link>.
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
