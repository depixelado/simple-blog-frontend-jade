const express = require('express');
const homeController = require('../controllers/homeController');

const router = express.Router();

/** Favicon */
router.use('/favicon.ico', (req, res) => res.end());

/* Home */
router.use('/', homeController.home);

// /* User routes */
// router.use('/users', require('./user'));

module.exports = router;
