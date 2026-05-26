import { Router } from 'express';
import { getProjects } from '../controllers/projects.controller.js';
import { projectQueryValidator } from '../validators/project.validator.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = Router();

router.get('/', projectQueryValidator, validateRequest, getProjects);

export default router;
