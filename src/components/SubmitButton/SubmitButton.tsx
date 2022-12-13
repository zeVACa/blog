import classNames from 'classnames';
import styles from './SubmitButton.module.scss';

interface IProps {
  title: string;
  disabled?: boolean;
}

function SubmitButton({ title, disabled }: IProps) {
  return (
    <button
      type='submit'
      className={classNames(styles.submitButton, { [styles['submitButton--disabled']]: disabled })}
      disabled={disabled}
    >
      {title}
    </button>
  );
}

SubmitButton.defaultProps = {
  disabled: false,
};

export default SubmitButton;
