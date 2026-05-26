import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    client: {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, lowercase: true, trim: true, index: true },
      phone: { type: String, required: true, trim: true }
    },
    projectType: {
      type: String,
      required: true,
      enum: ['Residential', 'Commercial', 'Furniture'],
      index: true
    },
    timeline: { type: String, required: true, trim: true },
    budgetRange: { type: String, required: true, trim: true },
    message: { type: String, trim: true, maxlength: 1200 },
    leadScore: { type: Number, required: true, min: 0, max: 100, index: true },
    submittedAt: { type: Date, default: Date.now, index: true }
  },
  { timestamps: true }
);

leadSchema.index({ leadScore: -1, submittedAt: -1 });

export default mongoose.model('Lead', leadSchema);
