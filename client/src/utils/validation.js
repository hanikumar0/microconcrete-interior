const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const phonePattern = /^\+?[1-9]\d{7,14}$/;

export function validateLead(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = 'Name is required.';
  if (!emailPattern.test(values.email.trim())) errors.email = 'Enter a valid email address.';
  if (!phonePattern.test(values.phone.replace(/[\s().-]/g, ''))) {
    errors.phone = 'Enter a valid international phone number.';
  }
  if (!values.projectScope) errors.projectScope = 'Select a project scope.';
  if (!values.timeline) errors.timeline = 'Select an expected timeline.';
  if (!values.budgetRange) errors.budgetRange = 'Select a budget range.';

  return errors;
}
