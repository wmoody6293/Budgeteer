const asyncHandler = require('express-async-handler');
const Expense = require('../models/expenseModel');
//This will retrieve expenses from database
//Route is GET /api
const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find();

  res.status(200).json(expenses);
});

//This will set expenses from database
//Route is POST /api
const setExpenses = asyncHandler(async (req, res) => {
  console.log('This is req.body', req.body);
  if (!req.body.date || !req.body.category || !req.body.amount) {
    res.status(400);
    throw new Error('Please send valid text field');
  }
  const expense = await Expense.create({
    date: req.body.date,
    category: req.body.category,
    amount: req.body.amount,
  });
  res.status(200).json(expense);
});

//This will update expense from database
//Route is PUT /api/:id
const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense) {
    res.status(400);
    throw new Error('Expense not found');
  }
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the expense user
  if (expense.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedExpense = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedExpense);
});

//This will delete expense from database
//Route is DELETE /api/report/:id
const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense) {
    res.status(400);
    throw new Error('Expense not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the expense user
  if (expense.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await expense.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getExpenses,
  setExpenses,
  updateExpense,
  deleteExpense,
};
