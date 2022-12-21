import { useForm, useFieldArray } from 'react-hook-form';
import classNames from 'classnames';
import { IArticleCreated } from '../../../types.d';
import styles from './CreateArticleForm.module.scss';

import '../../../index.scss';

interface IFormInputs {
  title: string;
  description: string;
  text: string;
  tagList: { name: string }[];
}

interface IProps {
  // eslint-disable-next-line no-unused-vars
  onSubmitArticleHandler: (article: IArticleCreated) => void;
  fetchedArticleData?: {
    title: string;
    description: string;
    text: string;
    tagList: { name: string }[];
  };
}

function CreateArticleForm({ onSubmitArticleHandler, fetchedArticleData }: IProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    getValues,
  } = useForm<IFormInputs>({
    mode: 'onSubmit',
    defaultValues: {
      title: fetchedArticleData?.title || '',
      description: fetchedArticleData?.description || '',
      text: fetchedArticleData?.text || '',
      tagList: fetchedArticleData?.tagList || [],
    },
  });

  const { fields, append, remove } = useFieldArray({ name: 'tagList', control });

  const onSubmitHandle = (submitedData: IFormInputs) => {
    const { title, description, text, tagList } = submitedData;

    onSubmitArticleHandler({
      article: { title, description, body: text, tagList: tagList.map((tag) => tag.name) },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandle)}>
      <label className={styles.label}>
        Title
        <input
          type='text'
          placeholder='Title'
          className={classNames({ 'form-input': true, 'form-input--error': errors.title })}
          {...register('title', {
            required: 'Title is required',
            maxLength: { value: 1000, message: 'Maximum title length 1000 characters' },
          })}
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
        />
      </label>
      <p className='form-error-message'>{errors.text?.message?.toString()}</p>
      <label className={styles.label}>Tags</label>

      {fields.length === 0 && (
        <div>
          <input
            type='button'
            value='Add tags'
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
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message:
                    'You can use only english letters and digits without spaces and other symbols',
                },
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

CreateArticleForm.defaultProps = {
  fetchedArticleData: null,
};

export default CreateArticleForm;
