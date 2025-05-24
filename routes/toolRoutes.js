const express = require('express');
const router = express.Router();
const controller = require('../controllers/toolController');

router.get('/', controller.getAllTools);
router.post('/', controller.createTool);
router.get('/:id', controller.getToolById);
router.put('/:id', controller.updateTool);
router.delete('/:id', controller.deleteTool);

module.exports = router;