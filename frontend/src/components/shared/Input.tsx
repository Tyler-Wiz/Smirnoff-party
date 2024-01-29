import { FC } from "react";

interface InputProps {
  register: any;
  name: string;
  label?: string;
  type: string;
  error?: string;
  placeholder?: string;
  errorLabel?: string;
}

const Input: FC<InputProps> = ({
  register,
  name,
  label,
  type,
  error,
  placeholder,
  errorLabel,
}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={name}
        type={type}
        {...register(name)}
        placeholder={placeholder}
      />
      {error && (
        <span role="alert" className="error-message" aria-label={errorLabel}>
          {error}
        </span>
      )}
    </>
  );
};

export default Input;
