import styles from './SubmitButton.module.scss';

interface IProps {
  title: string;
}

function SubmitButton({ title }: IProps) {
  return (
    <button type='submit' className={styles.submitButton}>
      {title}
    </button>
  );
}

export default SubmitButton;
