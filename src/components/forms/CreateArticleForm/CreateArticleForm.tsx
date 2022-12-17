/* eslint-disable */

import { useForm } from 'react-hook-form';
import styles from './CreateArticleForm.module.scss';

import '../../../index.scss';
import classNames from 'classnames';
import SubmitButton from '../../SubmitButton';

function CreateArticleForm() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    mode: 'all',
    // defaultValues: {
    //   username: '',
    //   email: '',
    //   password: '',
    //   avatar: '',
    // },
  });

  return (
    <form>
      <label className={styles.label}>
        Title
        <input type='text' className='form-input' placeholder='Title' />
      </label>
      <label className={styles.label}>
        Short description
        <input type='text' className='form-input' placeholder='Description' />
      </label>
      <label className={styles.label}>
        Text
        <textarea
          className={classNames('form-input', styles.textarea)}
          placeholder='Text'
        ></textarea>
      </label>
      <label className={styles.label}>Tags</label>
      <div className={styles.tagRow}>
        <input
          type='text'
          placeholder='Tag'
          className={classNames('form-input', styles.tagInput)}
        />
        <input
          type='button'
          value='Delete'
          className={classNames(styles.tagButton, styles.deleteTagButton)}
        />
        <input
          type='button'
          value='Add tag'
          className={classNames(styles.tagButton, styles.addTagButton)}
        />
      </div>
      <button type='submit' className={classNames(styles.submitButton)}>
        Send
      </button>
    </form>
  );
}

export default CreateArticleForm;
