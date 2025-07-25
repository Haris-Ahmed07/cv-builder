const express = require('express');
const router = express.Router();
const {
  createOrUpdateCV,
  getCV,
  deleteCV
} = require('../controllers/cvController');

// Single resume endpoints
router.post('/', createOrUpdateCV);  // create or update CV
router.get('/', getCV);              // get current CV
router.delete('/', deleteCV);        // delete current CV

module.exports = router;
