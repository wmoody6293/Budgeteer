import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import expenseService from './expenseService';
//initial state should contain each expense for every user, as well as
//a sum of all expense amounts for ValsDisplay, and a totalBudget value for valsDispaly
const initialState = {
  expenses: [],
  totalExpenses: 0,
  totalBudget: 0,
  isError: false,
  isSuccess: false,
  message: '',
};

//Create Expense function for ExpenseForm.jsx field:

export const createExpense = createAsyncThunk(
  'report/create',
  async (expenseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await expenseService.createExpense(expenseData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user Expenses
export const getExpenses = createAsyncThunk(
  'report/getAll',
  async (_, thunkAPI) => {
    try {
      console.log('Inside the get Expenses func of expenseSlice!!!!!');
      const token = thunkAPI.getState().auth.user.token;
      console.log('Here is the token in getExpenses in expenseSlice!!!', token);
      return await expenseService.getExpenses(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete user Expense
export const deleteExpense = createAsyncThunk(
  'expense/delete',
  async (obj, thunkAPI) => {
    const object = Object.assign({}, obj);
    try {
      const token = thunkAPI.getState().auth.user.token;
      const data = await expenseService.deleteExpense(obj.id, token);
      data.amount = object.amount;
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expenses.push(action.payload);
        state.totalExpenses += Number(action.payload.amount);
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.totalExpenses = action.payload.reduce((acc, expense) => {
          return acc + Number(expense.amount);
        }, 0);
        state.expenses = action.payload;
      })
      .addCase(getExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        console.log(
          'This is action payload in deleteExpense in expenseSlice.js',
          action.payload
        );
        state.isLoading = false;
        state.isSuccess = true;
        state.totalExpenses -= Number(action.payload.amount);
        state.expenses = state.expenses.filter(
          (expense) => expense._id !== action.payload.id
        );
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = expenseSlice.actions;
export default expenseSlice.reducer;
