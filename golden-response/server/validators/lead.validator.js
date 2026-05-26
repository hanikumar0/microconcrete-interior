import { body } from 'express-validator';

const phonePattern = /^\+?[1-9]\d{7,14}$/;

export const leadValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 120 })
    .withMessage('Name must be between 2 and 120 characters')
    .escape(),
  body('email').trim().isEmail().withMessage('Invalid email format').normalizeEmail(),
  body('phone')
    .trim()
    .customSanitizer((value) => value.replace(/[\s().-]/g, ''))
    .matches(phonePattern)
    .withMessage('Invalid international phone number'),
  body('projectScope').isIn(['Residential', 'Commercial', 'Furniture']).withMessage('Invalid project scope'),
  body('timeline').isIn(['Immediately', '0-3 months', '3-6 months', '6+ months']).withMessage('Invalid timeline'),
  body('budgetRange').isIn(['$10k-$25k', '$25k-$50k', '$50k-$100k', '$100k+']).withMessage('Invalid budget range'),
  body('message').optional({ checkFalsy: true }).trim().isLength({ max: 1200 }).withMessage('Message must be 1200 characters or fewer').escape()
];
