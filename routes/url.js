const express = require('express');
const router = express.Router();
const validateURL = require('../middleware/validate-url');

const {getURL, createURL} = require('../controllers/url');

router.route('/').post(validateURL, createURL);
router.route('/:id').get(getURL);

module.exports = router;