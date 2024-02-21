"use client";

import Button from "@/app/components/common/Button";
import TextField from "@/app/components/common/Form/TextField";
import TextAreaField from "@/app/components/common/Form/TextAreaField";
import useSubmitForm from "./useSubmitForm";
import useValidateForm from "./useValidateForm";
import { FieldConfig, FormFields } from "./interfaces";
import React, { useState } from "react";

const ContactForm = ({
  header = "Learn How Articul8 Can Unlock Value for Your Enterprise"
}: {
  header: string;
}) => {
  const { submitForm, submitted, submitError } = useSubmitForm(
    process.env.NEXT_PUBLIC_API_URL || ""
  );
  const initFormFields: FormFields = {
    name: "",
    company: "",
    email: "",
    subject: ""
  };

  const { formFields, handleInputChange, errors, validate } = useValidateForm(
    initFormFields
  );
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const globalSubErrorMsg =
    "There was an error while submitting the form. Please try again.";
  const successMsg =
    "Thank you for your interest. Someone from our team will reach out shortly.";
  const globalFieldsErrorMsg = "*Please input required fields to continue.";

  const areAllFieldsEmpty = Object.values(formFields).every(
    (value) => value === ""
  );

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setHasAttemptedSubmit(true);

    if (areAllFieldsEmpty) {
      return;
    }

    const isValid = validate();
    if (!isValid) return;
    submitForm(formFields);
  };

  if (submitted) {
    return (
      <>
        <div className="flex flex-col items-center h-screen text-white -mt-10 justify-center space-y-5">
          <h2 className="mx-4 text-center text-neutral-white">{header}</h2>
          <p className="text-center text-lg">{successMsg}</p>
        </div>
      </>
    );
  }

  const fieldsConfig: FieldConfig[] = [
    { name: "name", placeholder: "Name", type: "text" },
    { name: "email", placeholder: "Email", type: "text" },
    { name: "company", placeholder: "Company", type: "text" },
    {
      name: "subject",
      placeholder: "Message",
      type: "textarea",
      rows: 6,
      maxLength: 1000
    }
  ];

  const createErrorMessage = (key: string) =>
    `*Invalid ${key}. Please enter a valid ${key} to continue.`;

  return (
    <div className="mx-4">
      <h2 className="mx-4 text-center text-neutral-white">{header}</h2>
      <form
        onSubmit={onSubmit}
        className="flex flex-col max-w-2xl mx-auto my-8">
        <div className="flex flex-col w-full gap-5">
          {fieldsConfig.map((field, idx) => {
            const isErrorDisplayed =
              hasAttemptedSubmit &&
              !areAllFieldsEmpty &&
              errors[field.name] !== undefined;
            const commonProps = {
              id: field.name,
              name: field.name,
              placeholder: field.placeholder,
              value: formFields[field.name],
              onChange: handleInputChange(field.name),
              error: errors[field.name],
              displayError: isErrorDisplayed,
              errorMsg: createErrorMessage(field.name)
            };

            return field.type === "textarea" ? (
              <span key={field.name}>
                <TextAreaField
                  {...commonProps}
                  rows={field.rows || 6}
                  maxLength={field.maxLength || 1000}
                />
              </span>
            ) : (
              <span key={field.name}>
                <TextField {...commonProps} />
              </span>
            );
          })}

          {hasAttemptedSubmit && areAllFieldsEmpty && (
            // TODO: create a reusable css for error message once we have design finalized
            <p className="text-alert-lightRed caption">
              {globalFieldsErrorMsg}
            </p>
          )}
        </div>
        <div className="h-7 mt-7 text-neutral-white">
          <Button text="Submit" type="submit" />{" "}
        </div>
        {submitError && (
          <p className="my-2 text-base text-alert-lightRed">
            {globalSubErrorMsg}
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
