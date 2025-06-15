console.log('routes/userRoutes.js loaded');
const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/userController');

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation chains for user
const userValidationRules = [
  body('name').isString().withMessage('name must be a string').notEmpty().withMessage('name is required'),
  body('preferredFrontend').isString().withMessage('preferredFrontend must be a string').notEmpty().withMessage('preferredFrontend is required'),
  body('preferredBackend').isString().withMessage('preferredBackend must be a string').notEmpty().withMessage('preferredBackend is required')
];

const idValidation = [
  param('id').isMongoId().withMessage('Invalid user ID')
];

router.get('/', controller.getAllUsers);
router.post('/', userValidationRules, validate, controller.createUser);
router.get('/:id', idValidation, validate, controller.getUserById);
router.put('/:id', idValidation.concat(userValidationRules), validate, controller.updateUser);
router.delete('/:id', idValidation, validate, controller.deleteUser);

module.exports = router;
