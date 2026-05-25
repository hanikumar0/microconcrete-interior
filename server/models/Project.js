import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    width: Number,
    height: Number,
    alt: { type: String, required: true },
    format: { type: String, enum: ['webp', 'jpg', 'png'], default: 'webp' }
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['residential', 'commercial', 'furniture', 'wall', 'ceiling', 'terrace', 'bar'],
      index: true
    },
    materialSpecifications: {
      finish: String,
      sealant: String,
      substrate: String,
      thickness: String
    },
    images: {
      thumbnail: imageSchema,
      gallery: [imageSchema]
    },
    tags: [{ type: String, trim: true, index: true }],
    completionDate: { type: Date, index: true }
  },
  { timestamps: true }
);

projectSchema.index({ category: 1, completionDate: -1 });

export default mongoose.model('Project', projectSchema);
