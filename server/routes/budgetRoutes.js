const express = require('express');
const router = express.Router();
const {
  getExpenses,
  setExpenses,
  updateExpense,
  deleteExpense,
} = require('../controllers/BudgetController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getExpenses);
router.post('/', protect, setExpenses);
router.put('/:id', protect, updateExpense);
router.delete('/:id', protect, deleteExpense);

module.exports = router;
