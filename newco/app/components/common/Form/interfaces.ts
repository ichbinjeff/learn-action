export interface FieldConfig {
  name: string;
  placeholder: string;
  type: "text" | "textarea";
  rows?: number;
  maxLength?: number;
}

export interface FormFields {
  [key: string]: string;
}

export interface Errors {
  [key: string]: boolean;
}
