const express = require('express');
const router = express.Router();
const {
  getBudget,
  setBudget,
  updateBudget,
  deleteBudget,
} = require('../controllers/budgetTotalController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getBudget);
router.post('/', protect, setBudget);
router.put('/:id', protect, updateBudget);
router.delete('/:id', protect, deleteBudget);

module.exports = router;
