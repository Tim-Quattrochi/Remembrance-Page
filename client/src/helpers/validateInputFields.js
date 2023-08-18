/**
 *
 * @param {string} fieldName - the inputs field name.
 * @param {Object} data - form data object.
 * @param {Object} touched - indicates whether the fields have been interacted with.
 * @returns {string} An error message if validation fails, else an empty string.
 */
export const validateFields = (fieldName, data, touched) => {
  if (!data[fieldName]?.trim() && touched[fieldName]) {
    // if true, the field has been interacted with
    return `${
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
    } is required.`;
  } else if (
    fieldName === "email" &&
    touched.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  ) {
    return "Please enter a valid email address.";
  } else if (
    fieldName === "password" &&
    touched.password &&
    data.password.length < 7
  ) {
    return "Password must be at least 7 characters long.";
  } else if (
    fieldName === "confirmPassword" &&
    touched.confirmPassword &&
    data.password !== data.confirmPassword
  ) {
    return "Passwords do not match.";
  }
  return "";
};
