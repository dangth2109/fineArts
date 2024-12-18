const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  competition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competition',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return v.startsWith('https://res.cloudinary.com/');
      },
      message: props => `${props.value} is not a valid Cloudinary URL!`
    }
  },
  description: String,
  poem: String,
  story: String,
  evaluation: {
    grade: {
      type: String,
      enum: ['best', 'better', 'good', 'moderate', 'normal', 'disqualified'],
    },
    remarks: String,
    evaluatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    evaluatedAt: Date
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);