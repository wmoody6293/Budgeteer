import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createExpense } from '../features/expenses/expenseSlice';
function ExpenseForm() {
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createExpense({ date, category, amount }));
    setDate('');
    setCategory('');
    setAmount('');
  };
  return (
    <section className="form">
      <h1 className="h1Label">Submit Expenses Here:</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="date">Expense Date:</label>
          <input
            type="text"
            name="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></input>
          <label htmlFor="category">Expense Category:</label>
          <input
            type="text"
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          ></input>
          <label htmlFor="amount">Expense Amount:</label>
          <input
            type="text"
            name="amount"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Expense
          </button>
        </div>
      </form>
    </section>
  );
}

export default ExpenseForm;
