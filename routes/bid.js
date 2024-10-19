const express = require('express');
const { body } = require('express-validator');
const bidController = require('../controllers/bid');

const router = express.Router();

const isAuth = require('../middlewares/isAuth');
const checkProducer = require('../middlewares/isProducer');

// @route   POST /bid/:adId?amount=<amount>
// @desc    Post a new ad
// @access  protected
router.post('/:adId?', isAuth,checkProducer, bidController.addBid);

// @route   GET /bid/:adId?option=<highest>
// @desc    List of bids on an ad
// @access  protected
router.get('/:adId?', isAuth,checkProducer, bidController.listBids);

module.exports = router;
