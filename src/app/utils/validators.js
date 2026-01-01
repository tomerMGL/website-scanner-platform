
export const validators = {
  name: (value) => /^[\u0590-\u05FFa-zA-Z\s]{2,}$/.test(value),
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  phone: (value) => /^05\d{8}$|^07\d{8}$/.test(value)
};

export const validateForm = (formData) => {
  const errors = {};
  
  if (!validators.name(formData.name)) {
    errors.name = "שם לא תקין";
  }

  if (!validators.email(formData.email)) {
    errors.email = "כתובת אימייל לא תקינה";
  }

  if (!validators.phone(formData.phone)) {
    errors.phone = "מספר טלפון לא תקין";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};