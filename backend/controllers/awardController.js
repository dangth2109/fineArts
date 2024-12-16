const Award = require('../models/Award');

exports.createAward = async (req, res) => {
  try {
    const award = new Award({
      ...req.body,
      awardedBy: req.user.id
    });
    await award.save();
    res.status(201).json(award);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAwards = async (req, res) => {
  try {
    const awards = await Award.find()
      .populate('competition')
      .populate('submission')
      .populate('student', 'username')
      .populate('awardedBy', 'username');
    res.json(awards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAwardById = async (req, res) => {
  try {
    const award = await Award.findById(req.params.id)
      .populate('competition')
      .populate('submission')
      .populate('student', 'username')
      .populate('awardedBy', 'username');
    if (!award) {
      return res.status(404).json({ message: 'Award not found' });
    }
    res.json(award);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAward = async (req, res) => {
  try {
    const award = await Award.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!award) {
      return res.status(404).json({ message: 'Award not found' });
    }
    res.json(award);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAward = async (req, res) => {
  try {
    const award = await Award.findByIdAndDelete(req.params.id);
    if (!award) {
      return res.status(404).json({ message: 'Award not found' });
    }
    res.json({ message: 'Award deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};