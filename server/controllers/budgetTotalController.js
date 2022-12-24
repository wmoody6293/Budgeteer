const asyncHandler = require('express-async-handler');
const Budget = require('../models/budgetModel');
const User = require('../models/userModel');

const getBudget = asyncHandler(async (req, res) => {
  //req.user.id came from authMiddleware func
  const budget = await Budget.find({ user: req.user.id });

  res.status(200).json(budget);
});

//This will set budget from database
//Route is POST /api
const setBudget = asyncHandler(async (req, res) => {
  console.log('This is req.body', req.body);
  if (!req.body.budget) {
    res.status(400);
    throw new Error('Please send valid text field');
  }
  const budget = await Budget.create({
    budget: req.body.budget,
    user: req.user.id,
  });
  res.status(200).json(budget);
});

//This will update expense from database
//Route is PUT /api/:id
const updateBudget = asyncHandler(async (req, res) => {
  const budget = await Budget.findById(req.params.id);
  if (!budget) {
    res.status(400);
    throw new Error('Budget not found');
  }
  const user = await User.findById(req.user.id);
  // Check for user
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the expense user
  if (budget.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedBudget = await Budget.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedBudget);
});

//This will delete expense from database
//Route is DELETE /api/report/:id
const deleteBudget = asyncHandler(async (req, res) => {
  const budget = await Budget.findById(req.params.id);
  if (!budget) {
    res.status(400);
    throw new Error('Budget not found');
  }

  const user = await User.findById(req.user.id);
  // Check for user
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the expense user
  if (budget.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await budget.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getBudget,
  setBudget,
  updateBudget,
  deleteBudget,
};
