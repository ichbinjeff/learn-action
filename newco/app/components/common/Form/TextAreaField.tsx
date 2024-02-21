import BaseField from "./BaseField";

interface TextAreaFieldProps {
  id: string;
  name: string;
  placeholder: string;
  rows: number;
  maxLength: number;
  value: string;
  onChange: (value: string) => void;
  error: boolean;
  displayError: boolean;
  errorMsg: string;
}

interface TextAreaProps {
  id: string;
  name: string;
  placeholder: string;
  rows?: number;
  maxLength?: number;
  value: string;
  onChange: (e: any) => void;
  className: string;
}

const TextArea = (props: TextAreaProps) => {
  return (
    <textarea
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      rows={props.rows}
      maxLength={props.maxLength}
      value={props.value}
      onChange={props.onChange}
      className={`resize-none ${props.className}`}
    />
  );
};

export default function TextAreaField({
  id,
  name,
  placeholder,
  rows,
  maxLength,
  value,
  onChange,
  error,
  displayError,
  errorMsg
}: TextAreaFieldProps) {
  return (
    <BaseField
      inputElement={TextArea}
      error={error}
      displayError={displayError}
      errorMsg={errorMsg}
      onChange={onChange}
      value={value}
      inputElementProps={{
        id,
        name,
        placeholder,
        rows,
        maxLength
      }}
    />
  );
}
