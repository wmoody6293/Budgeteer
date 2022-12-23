// import { deleteExpense } from '../features/expenses/expenseSlice';
import { useDispatch } from 'react-redux';
import { deleteExpense } from '../features/expenses/expenseSlice';
function ExpenseLog({ expense }) {
  const dispatch = useDispatch();

  return (
    <div className="eachLog">
      <span className="logElements">
        <span className="expense-date">{expense.date}</span>
        <span className="expense-category">{expense.category}</span>
        <span className="expense-amount">${expense.amount}</span>
        <button
          onClick={() =>
            dispatch(deleteExpense({ id: expense._id, amount: expense.amount }))
          }
          className="close"
        >
          X
        </button>
      </span>
    </div>
  );
}

export default ExpenseLog;
