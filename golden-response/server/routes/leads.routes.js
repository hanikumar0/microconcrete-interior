import { Router } from 'express';
import { createLead } from '../controllers/leads.controller.js';
import { leadValidator } from '../validators/lead.validator.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = Router();

router.post('/', leadValidator, validateRequest, createLead);

export default router;
