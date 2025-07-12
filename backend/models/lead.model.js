import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true, min: 18, max: 100 },
  dateOfContact: { type: Date, required: true },
  level: {
    type: String,
    enum: ['Very Hot', 'Hot', 'Cold'],
    required: true
  },
  salesNotes: { type: String, required: true }
});

export const Lead = mongoose.model('Lead', leadSchema);
