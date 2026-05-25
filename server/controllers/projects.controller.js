import Project from '../models/Project.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { fallbackProjects } from '../utils/fallbackProjects.js';

export const getProjects = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category } : {};

  const projects = await Project.find(filter)
    .sort({ completionDate: -1 })
    .select('title description category materialSpecifications images tags completionDate')
    .lean();

  const data = projects.length
    ? projects
    : fallbackProjects.filter((project) => !category || project.category === category);

  res.json({
    success: true,
    message: 'Projects retrieved successfully',
    data
  });
});
