import { useState } from "react";
import isEmail from "validator/lib/isEmail";
import { FormFields, Errors } from "./interfaces";

// Validation constants
const MIN_NAME_LENGTH = 2;
const MIN_COMPANY_LENGTH = 2;
const MIN_SUBJECT_LENGTH = 3;

// Custom hook for form validation
const useValidateForm = (initialFormFields: FormFields) => {
  const [formFields, setFormFields] = useState<FormFields>(initialFormFields);
  const [errors, setErrors] = useState<Errors>({
    name: false,
    company: false,
    email: false,
    subject: false
  });

  // Function to update form fields
  const handleInputChange = (field: keyof FormFields) => (value: string) => {
    setFormFields({ ...formFields, [field]: value });
  };

  // Validation rules
  const validate = () => {
    const newErrors: Errors = {
      name: formFields.name.length < MIN_NAME_LENGTH,
      company: formFields.company.length < MIN_COMPANY_LENGTH,
      email: !isEmail(formFields.email),
      subject: formFields.subject.length < MIN_SUBJECT_LENGTH
    };

    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  return { formFields, handleInputChange, errors, validate };
};

export default useValidateForm;
