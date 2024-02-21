import { useState } from "react";

export default function useSubmitForm(url: string) {
  const [submitError, setSubmitError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setSuccess = () => {
    setSubmitted(true);
    setSubmitError(false);
  };

  const setFailure = () => {
    setSubmitted(false);
    setSubmitError(true);
  };

  const submitForm = async (payload: Record<string, any>) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // network error in the 4xx–5xx range
      if (!response.ok) {
        throw Error(
          `Error in form submission. Response status: ${response.status}. ${response.statusText} }`
        );
      }
      setSuccess();
    } catch (error) {
      console.log(error);
      setFailure();
    }
  };

  return { submitForm, submitted, submitError };
}
