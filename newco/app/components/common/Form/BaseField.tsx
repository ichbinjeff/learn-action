import React from "react";
import classNames from "classnames";

interface InputElementProps {
  id: string;
  name: string;
  placeholder: string;
  rows?: number;
  maxLength?: number;
}

interface BaseFieldProps {
  inputElement: React.ElementType;
  inputElementProps: InputElementProps;
  error: boolean;
  displayError: boolean;
  errorMsg: string;
  value: string;
  onChange: (value: string) => void;
}

export default function BaseField({
  inputElement: InputElement,
  inputElementProps,
  error,
  displayError,
  errorMsg,
  value,
  onChange
}: BaseFieldProps) {
  const borderClass = error ? "border-alert-lightRed" : "border-neutral-white";
  return (
    <div>
      <InputElement
        className={classNames(
          `border-2 rounded-[1px] ${borderClass} appearance-none w-full px-3 py-2 body2 text-neutral-white bg-neutral-transparentWhite placeholder-neutral-white`
        )}
        value={value}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => onChange(e.target.value)}
        {...inputElementProps}
      />
      {error && displayError && (
        <div className="mt-1 text-alert-lightRed caption">{errorMsg}</div>
      )}
    </div>
  );
}
