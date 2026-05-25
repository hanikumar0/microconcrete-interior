import xss from 'xss';

export function sanitizeText(value) {
  if (typeof value !== 'string') return value;
  return xss(value.trim(), {
    whiteList: {},
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script']
  });
}

export function sanitizeLeadPayload(payload) {
  return {
    name: sanitizeText(payload.name),
    email: sanitizeText(payload.email)?.toLowerCase(),
    phone: sanitizeText(payload.phone),
    projectScope: sanitizeText(payload.projectScope),
    timeline: sanitizeText(payload.timeline),
    budgetRange: sanitizeText(payload.budgetRange),
    message: sanitizeText(payload.message || '')
  };
}
