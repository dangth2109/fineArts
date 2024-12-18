const Submission = require('../models/Submission');
const Competition = require('../models/Competition');
const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');

const bufferToStream = (buffer) => {
  const readable = new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
  return readable;
};

exports.createSubmission = async (req, res) => {
  try {
    const competition = await Competition.findById(req.body.competition);
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }

    if (new Date() > competition.endDate) {
      return res.status(400).json({ message: 'Competition has ended' });
    }

    // Generate a custom public_id using competition and timestamp
    const timestamp = Date.now();
    const customPublicId = `submission_${competition._id}_${req.user.id}_${timestamp}`;

    // Upload to Cloudinary with custom public_id
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'fine-arts-submissions',
            public_id: customPublicId
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        bufferToStream(buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);

    const submission = new Submission({
      ...req.body,
      student: req.user.id,
      imageUrl: result.secure_url
    });

    await submission.save();
    res.status(201).json(submission);
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate('student', 'username')
      .populate('competition');
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.evaluateSubmission = async (req, res) => {
  try {
    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      {
        evaluation: {
          ...req.body,
          evaluatedBy: req.user.id,
          evaluatedAt: new Date()
        }
      },
      { new: true }
    );
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    // Extract public_id from Cloudinary URL
    const publicId = submission.imageUrl.split('/').slice(-1)[0].split('.')[0];
    
    // Delete from Cloudinary
    await cloudinary.uploader.destroy(`fine-arts-submissions/${publicId}`);
    
    // Delete from database
    await submission.deleteOne();
    
    res.json({ message: 'Submission deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};