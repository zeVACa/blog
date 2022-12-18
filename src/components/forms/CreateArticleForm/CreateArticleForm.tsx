/* eslint-disable */

import { useForm, useFieldArray } from 'react-hook-form';
import styles from './CreateArticleForm.module.scss';

import '../../../index.scss';
import classNames from 'classnames';

interface IFormInputs {
  title: string;
  description: string;
  text: string;
  tagList: { name: string }[];
}

function CreateArticleForm() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
    control,
    getValues,
  } = useForm<IFormInputs>({
    mode: 'all',
    defaultValues: {
      tagList: [],
    },
  });

  const { fields, append, remove } = useFieldArray({ name: 'tagList', control });

  const onSubmitHandle = (submitedData: IFormInputs) => {
    console.log('submitedData', submitedData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandle)}>
      <label className={styles.label}>
        Title
        <input
          type='text'
          placeholder='Title'
          className={classNames({ 'form-input': true, 'form-input--error': errors.title })}
          {...register('title', { required: 'Title is required' })}
        />
      </label>
      <p className='form-error-message'>{errors.title?.message?.toString()}</p>
      <label className={styles.label}>
        Short description
        <input
          type='text'
          className={classNames({ 'form-input': true, 'form-input--error': errors.description })}
          placeholder='Description'
          {...register('description', { required: 'Description is required' })}
        />
      </label>
      <p className='form-error-message'>{errors.description?.message?.toString()}</p>
      <label className={styles.label}>
        Text
        <textarea
          className={classNames(styles.textarea, {
            'form-input': true,
            'form-input--error': errors.text,
          })}
          {...register('text', { required: 'Text is required' })}
          placeholder='Text'
        ></textarea>
      </label>
      <p className='form-error-message'>{errors.text?.message?.toString()}</p>
      <label className={styles.label}>Tags</label>

      {fields.length === 0 && (
        <div>
          <input
            type='button'
            value='Add tag'
            className={classNames(styles.tagButton, styles.addTagButton)}
            onClick={() => append({ name: '' })}
          />
        </div>
      )}
      {fields.map((field, rowIndex) => (
        <div className={styles.tagRow} key={field.id}>
          <div>
            <input
              type='text'
              placeholder='Tag'
              defaultValue={fields.length}
              {...register(`tagList.${rowIndex}.name`, {
                required:
                  "Tag is required! If you don't want to provide the Tag, please delete the tag before sending form.",
                validate: (tagInputValue) =>
                  !getValues()
                    .tagList.map((tagObject: { name: string }) => tagObject.name)
                    .filter(
                      (_, currentChangingTagIndex: number) => rowIndex !== currentChangingTagIndex,
                    )
                    .includes(tagInputValue) || 'Tag must be unique!',
              })}
              className={classNames(styles.tagInput, {
                'form-input': true,
                'form-input--error': errors?.tagList?.[rowIndex],
              })}
            />
            <input
              type='button'
              value='Delete'
              className={classNames(styles.tagButton, styles.deleteTagButton)}
              onClick={() => remove(rowIndex)}
            />
            {fields.length - 1 === rowIndex && (
              <input
                type='button'
                value='Add tag'
                className={classNames(styles.tagButton, styles.addTagButton)}
                onClick={() => append({ name: '' })}
              />
            )}
          </div>
          {errors?.tagList?.[rowIndex] && (
            <p className={classNames('form-error-message', styles.tagErrorMessage)}>
              {errors?.tagList?.[rowIndex]?.name?.message?.toString()}
            </p>
          )}
        </div>
      ))}

      <button type='submit' className={classNames(styles.submitButton)}>
        Send
      </button>
    </form>
  );
}

export default CreateArticleForm;
