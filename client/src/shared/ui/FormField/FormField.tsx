import './FormField.scss';
import { type InputHTMLAttributes } from 'react';

interface OwnProps {
  label: string;
  errorMessage?: string;
}

type FormFieldProps = OwnProps & InputHTMLAttributes<HTMLInputElement>;

const FormField = (props: FormFieldProps ) => {
  const {
    label,
    errorMessage,
    ...inputProps
  } = props;

  return (
    <label className="form-field">
      <span className="form-field__label">{label}</span>
      <input className="form-field__input" {...inputProps} />
      {errorMessage && (
        <span className="form-field__error-text">{errorMessage}</span>
      )}
    </label>
  )
}

export default FormField;