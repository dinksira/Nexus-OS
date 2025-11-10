'use client'

import { useState, useCallback } from 'react';
import { FormErrors, validateEmail, validatePassword, validateUsername, validateConfirmPassword, validateTerms, getPasswordStrength } from '../utils/validation';

interface UseFormValidationProps {
  initialValues: { [key: string]: any };
  onSubmit: (values: any) => void;
}

export const useFormValidation = ({ initialValues, onSubmit }: UseFormValidationProps) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name: string, value: any) => {
    let fieldErrors: string[] = [];

    switch (name) {
      case 'email':
        fieldErrors = validateEmail(value).errors;
        break;
      case 'password':
        fieldErrors = validatePassword(value).errors;
        break;
      case 'username':
        fieldErrors = validateUsername(value).errors;
        break;
      case 'confirmPassword':
        fieldErrors = validateConfirmPassword(values.password, value).errors;
        break;
      case 'terms':
        fieldErrors = validateTerms(value).errors;
        break;
      default:
        break;
    }

    return fieldErrors;
  }, [values.password]);

  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(values).forEach(key => {
      const fieldErrors = validateField(key, values[key]);
      if (fieldErrors.length > 0) {
        newErrors[key] = fieldErrors;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField]);

  const handleChange = useCallback((name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation for touched fields
    if (touched[name]) {
      const fieldErrors = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: fieldErrors
      }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback((name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const fieldErrors = validateField(name, values[name]);
    setErrors(prev => ({
      ...prev,
      [name]: fieldErrors
    }));
  }, [values, validateField]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as { [key: string]: boolean });
    
    setTouched(allTouched);

    const isValid = validateForm();
    
    if (isValid && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, validateForm, onSubmit, isSubmitting]);

  const getFieldProps = (name: string) => ({
    value: values[name] || '',
    onChange: (value: any) => handleChange(name, value),
    onBlur: () => handleBlur(name),
    error: touched[name] ? errors[name]?.[0] : undefined,
    hasError: touched[name] && errors[name] && errors[name].length > 0,
  });

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    getFieldProps,
    validateField,
    getPasswordStrength: (password: string) => getPasswordStrength(password),
  };
};