let resume = null; // single in-memory resume

const createOrUpdateCV = (req, res) => {
  resume = req.body;
  res.status(200).json({ message: 'Resume saved', data: resume });
};

const getCV = (req, res) => {
  if (!resume) {
    return res.status(404).json({ message: 'No resume found' });
  }
  res.json(resume);
};

const deleteCV = (req, res) => {
  resume = null;
  res.json({ message: 'Resume deleted' });
};

module.exports = {
  createOrUpdateCV,
  getCV,
  deleteCV
};
