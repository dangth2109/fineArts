const Submission = require('../models/Submission');
const Competition = require('../models/Competition');

exports.createSubmission = async (req, res) => {
  try {
    const competition = await Competition.findById(req.body.competition);
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }

    if (new Date() > competition.endDate) {
      return res.status(400).json({ message: 'Competition has ended' });
    }

    const submission = new Submission({
      ...req.body,
      student: req.user.id,
      imageUrl: req.file.path
    });
    await submission.save();
    res.status(201).json(submission);
  } catch (error) {
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