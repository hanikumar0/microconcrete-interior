import Lead from '../models/Lead.js';
import { calculateLeadScore } from '../services/leadScoring.service.js';
import { sanitizeLeadPayload } from '../utils/sanitize.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const createLead = asyncHandler(async (req, res) => {
  const payload = sanitizeLeadPayload(req.body);
  const leadScore = calculateLeadScore(payload);

  const lead = await Lead.create({
    client: {
      name: payload.name,
      email: payload.email,
      phone: payload.phone
    },
    projectType: payload.projectScope,
    timeline: payload.timeline,
    budgetRange: payload.budgetRange,
    message: payload.message,
    leadScore
  });

  res.status(201).json({
    success: true,
    message: 'Lead submitted successfully',
    data: {
      id: lead._id,
      leadScore: lead.leadScore,
      submittedAt: lead.submittedAt
    }
  });
});
