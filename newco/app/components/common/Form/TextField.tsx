import BaseField from "./BaseField";

interface InputProps {
  id: string;
  className: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
}

const Input = (props: InputProps) => (
  <input
    id={props.id}
    className={props.className}
    name={props.name}
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.onChange}
  />
);

interface TextFieldProps {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error: boolean;
  displayError: boolean;
  errorMsg: string;
}

export default function TextField({
  id,
  name,
  placeholder,
  value,
  onChange,
  error,
  displayError,
  errorMsg
}: TextFieldProps) {
  return (
    <BaseField
      inputElement={Input}
      error={error}
      displayError={displayError}
      errorMsg={errorMsg}
      onChange={onChange}
      value={value}
      inputElementProps={{ id, name, placeholder }}
    />
  );
}
