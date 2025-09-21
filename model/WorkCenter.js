// import mongoose from 'mongoose';

// const WorkCenterSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Work center name is required.'],
//     trim: true,
//   },
//   code: {
//     type: String,
//     required: [true, 'Work center code is required.'],
//     unique: true,
//     trim: true,
//     uppercase: true,
//   },
//   description: {
//     type: String,
//     trim: true,
//   },
//   isActive: {
//     type: Boolean,
//     default: true,
//   }
// }, {
//   timestamps: true
// });

// export default mongoose.models.WorkCenter || mongoose.model('WorkCenter', WorkCenterSchema);
import mongoose from 'mongoose';

const WorkCenterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Work center name is required.'],
    trim: true,
  },
  code: {
    type: String,
    required: [true, 'Work center code is required.'],
    unique: true,
    trim: true,
    uppercase: true,
  },
  description: {
    type: String,
    trim: true,
  },
  costPerHour: {
    type: Number,
    required: [true, 'Cost per hour is required.'],
    // default: 0,
    // min: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true
});

export default mongoose.models.WorkCenter || mongoose.model('WorkCenter', WorkCenterSchema);

