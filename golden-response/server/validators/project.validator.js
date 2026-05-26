import { query } from 'express-validator';

export const projectQueryValidator = [
  query('category')
    .optional()
    .trim()
    .toLowerCase()
    .isIn(['residential', 'commercial', 'furniture', 'wall', 'ceiling', 'terrace', 'bar'])
    .withMessage('Invalid project category')
];
