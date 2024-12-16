const Competition = require('../models/Competition');

exports.createCompetition = async (req, res) => {
  try {
    const competition = new Competition({
      ...req.body,
      createdBy: req.user.id
    });
    await competition.save();
    res.status(201).json(competition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.find()
      .populate('createdBy', 'username');
    res.json(competitions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCompetitionById = async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id)
      .populate('createdBy', 'username');
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }
    res.json(competition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCompetition = async (req, res) => {
  try {
    const competition = await Competition.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }
    res.json(competition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCompetition = async (req, res) => {
  try {
    const competition = await Competition.findByIdAndDelete(req.params.id);
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }
    res.json({ message: 'Competition deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};