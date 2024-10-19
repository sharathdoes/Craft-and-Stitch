const express = require('express');
const { body } = require('express-validator');
const adController = require('../controllers/ad');

const router = express.Router();

const isAuth = require('../middlewares/isAuth');
const checkDesigner = require('../middlewares/isDesigner.js'); // Import checkDesigner

// @route   POST /ad
// @desc    Post a new ad
// @access  protected
router.post(
  '/',
  isAuth,checkDesigner,
  [
    body('productName', 'Invalid productName').trim().not().isEmpty(),
    body('basePrice', 'Invalid basePrice').trim().isNumeric(),
    body('duration', 'Invalid duration').trim().isNumeric(),
  ],
  adController.addAd
);

// @route   GET /ad?user=<userId>&option=<active>
// @desc    Retrieve list of all ads. Optional query param of user.
// @access  protected
router.get('/?', isAuth, adController.retrieveAds);

// @route   GET /ad/:id
// @desc    Find one ad
// @access  protected
router.get('/:id', isAuth, adController.findAd);

// @route   PUT /ad/:id
// @desc    Update an ad
// @access  protected and must be designer
router.put('/:id', isAuth, checkDesigner, adController.updateAd); // Added checkDesigner

// @route   DELETE /ad/:id
// @desc    Delete an ad
// @access  protected and must be designer
router.delete('/:id', isAuth, checkDesigner, adController.deleteAd); // Added checkDesigner

module.exports = router;
