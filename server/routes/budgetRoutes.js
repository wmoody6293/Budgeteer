const express = require('express');
const router = express.Router();
const {
  getExpenses,
  setExpenses,
  updateExpense,
  deleteExpense,
} = require('../controllers/BudgetController');

// const { protect } = require('../middleware/authMiddleware');

router.get('/', getExpenses);
router.post('/', setExpenses);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
