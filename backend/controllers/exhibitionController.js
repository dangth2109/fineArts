const Exhibition = require('../models/Exhibition');

exports.createExhibition = async (req, res) => {
  try {
    const exhibition = new Exhibition({
      ...req.body,
      createdBy: req.user.id
    });
    await exhibition.save();
    res.status(201).json(exhibition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getExhibitions = async (req, res) => {
  try {
    const exhibitions = await Exhibition.find()
      .populate('submissions.submission')
      .populate('createdBy', 'username');
    res.json(exhibitions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getExhibitionById = async (req, res) => {
  try {
    const exhibition = await Exhibition.findById(req.params.id)
      .populate('submissions.submission')
      .populate('createdBy', 'username');
    if (!exhibition) {
      return res.status(404).json({ message: 'Exhibition not found' });
    }
    res.json(exhibition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateExhibition = async (req, res) => {
  try {
    const exhibition = await Exhibition.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!exhibition) {
      return res.status(404).json({ message: 'Exhibition not found' });
    }
    res.json(exhibition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteExhibition = async (req, res) => {
  try {
    const exhibition = await Exhibition.findByIdAndDelete(req.params.id);
    if (!exhibition) {
      return res.status(404).json({ message: 'Exhibition not found' });
    }
    res.json({ message: 'Exhibition deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addSubmissionToExhibition = async (req, res) => {
  try {
    const exhibition = await Exhibition.findById(req.params.id);
    if (!exhibition) {
      return res.status(404).json({ message: 'Exhibition not found' });
    }

    exhibition.submissions.push({
      submission: req.body.submissionId,
      price: req.body.price
    });

    await exhibition.save();
    res.json(exhibition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSubmissionStatus = async (req, res) => {
  try {
    const exhibition = await Exhibition.findOneAndUpdate(
      { 
        _id: req.params.exhibitionId,
        'submissions._id': req.params.submissionId 
      },
      { 
        $set: {
          'submissions.$.status': req.body.status,
          'submissions.$.soldPrice': req.body.soldPrice,
          'submissions.$.soldTo': req.body.soldTo,
          'submissions.$.paymentStatus': req.body.paymentStatus
        }
      },
      { new: true }
    );

    if (!exhibition) {
      return res.status(404).json({ message: 'Exhibition or submission not found' });
    }

    res.json(exhibition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};