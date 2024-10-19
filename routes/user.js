const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/user');

const router = express.Router();

const isAuth = require('../middlewares/isAuth');
const checkDesigner= require('../middlewares/isProducer');
const checkProducer= require('../middlewares/isDesigner.js');
// @route   POST /user
// @desc    Register user
// @access  public
router.post(
  '/reg',
  [
    body('username', 'Invalid name').trim().not().isEmpty(),
    body('email', 'Invalid email').trim().isEmail(),
    body('password', 'Enter valid password with min length of 6 char')
      .trim()
      .isLength({ min: 6 }),
      body('role', 'Role is required').trim().not().isEmpty(),
  ],
  userController.registerUser
);

// @route   GET /user/:id
// @desc    Get user by id
// @access  protected
router.get('/:id', isAuth, userController.getUserById);

// @route   GET /user/purchased
// @desc    Get products purchased by user
// @access  protected
router.get('/products/purchased',checkProducer, isAuth, userController.purchasedProducts);

// @route   GET /user/posted
// @desc    Get product ads posted by user
// @access  protected
router.get('/products/posted',checkDesigner, isAuth, userController.postedProducts);

module.exports = router;
