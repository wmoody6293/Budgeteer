//axios creates HTTP request and performs a similar function that postman does
import axios from 'axios';

//We added a proxy to frontend package.json that will add http://localhost:8000 then tack on the url when
//making http requests
const API_URL = '/api/report/';

//Create new Expense from ExpenseForm.jsx
const createExpense = async (expenseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, expenseData, config);
  return response.data;
};

//Get All Expenses of user
const getExpenses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log('Inside getExpenses in expenseService!!');
  const response = await axios.get(API_URL, config);
  console.log('This is response from axios.get!', response);
  return response.data;
};

//Delete user expense
const deleteExpense = async (expenseId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + expenseId, config);
  return response.data;
};

const expenseService = {
  createExpense,
  getExpenses,
  deleteExpense,
};

export default expenseService;
