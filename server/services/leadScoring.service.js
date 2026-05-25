const budgetWeights = {
  '$10k-$25k': 12,
  '$25k-$50k': 24,
  '$50k-$100k': 36,
  '$100k+': 48
};

const timelineWeights = {
  Immediately: 26,
  '0-3 months': 22,
  '3-6 months': 14,
  '6+ months': 8
};

const categoryWeights = {
  Residential: 14,
  Commercial: 24,
  Furniture: 10
};

export function calculateLeadScore({ budgetRange, timeline, projectScope }) {
  const baseScore = 10;
  const score =
    baseScore +
    (budgetWeights[budgetRange] || 0) +
    (timelineWeights[timeline] || 0) +
    (categoryWeights[projectScope] || 0);

  return Math.min(100, score);
}
