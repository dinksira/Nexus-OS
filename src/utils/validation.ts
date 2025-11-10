export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface FormErrors {
  [key: string]: string[];
}

export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!email) {
    errors.push('Quantum ID is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Please enter a valid quantum ID');
  } else if (email.length > 254) {
    errors.push('Quantum ID is too long');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!password) {
    errors.push('Encryption key is required');
  } else {
    if (password.length < 8) {
      errors.push('Encryption key must be at least 8 characters');
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Encryption key must contain lowercase letters');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Encryption key must contain uppercase letters');
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Encryption key must contain numbers');
    }
    if (!/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(password)) {
      errors.push('Encryption key must contain special characters');
    }
    if (password.length > 128) {
      errors.push('Encryption key is too long');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateUsername = (username: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!username) {
    errors.push('Operator name is required');
  } else {
    if (username.length < 3) {
      errors.push('Operator name must be at least 3 characters');
    }
    if (username.length > 30) {
      errors.push('Operator name is too long');
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      errors.push('Operator name can only contain letters, numbers, underscores, and hyphens');
    }
    if (/^\d+$/.test(username)) {
      errors.push('Operator name cannot be only numbers');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateConfirmPassword = (password: string, confirmPassword: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!confirmPassword) {
    errors.push('Please confirm your encryption key');
  } else if (password !== confirmPassword) {
    errors.push('Encryption keys do not match');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateTerms = (accepted: boolean): ValidationResult => {
  const errors: string[] = [];
  
  if (!accepted) {
    errors.push('You must accept the Quantum Service Agreement');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Real-time validation helpers
export const getPasswordStrength = (password: string): { strength: number; feedback: string } => {
  if (!password) return { strength: 0, feedback: 'Enter encryption key' };

  let strength = 0;
  const feedback: string[] = [];

  // Length check
  if (password.length >= 8) strength += 25;
  else feedback.push('At least 8 characters');

  // Lowercase check
  if (/(?=.*[a-z])/.test(password)) strength += 25;
  else feedback.push('Lowercase letters');

  // Uppercase check
  if (/(?=.*[A-Z])/.test(password)) strength += 25;
  else feedback.push('Uppercase letters');

  // Number check
  if (/(?=.*\d)/.test(password)) strength += 15;
  else feedback.push('Numbers');

  // Special character check
  if (/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(password)) strength += 10;
  else feedback.push('Special characters');

  return {
    strength,
    feedback: feedback.length > 0 ? `Missing: ${feedback.join(', ')}` : 'Quantum-grade security achieved!'
  };
};