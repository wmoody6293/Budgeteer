import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseLog from '../components/ExpenseLog';
import Spinner from '../components/Spinner';
import { getExpenses, reset } from '../features/expenses/expenseSlice';

function Dashboard() {
  const [TotalExpense, setTotalExpense] = useState(0);

  const [TotalBudget, setTotalBudget] = useState(0);
  const [budgetTotal, setBudgetTotal] = useState('');
  const [displayBudgetTotal, setDisplayBudgetTotal] = useState(0);

  const [remaining, setRemaining] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { expenses, totalBudget, totalExpenses, isLoading, isError, message } =
    useSelector((state) => state.expenseInfo);

  ///logout not working due to something with getExpenses() function. Inside ExpenseSlice we are getting
  //error that token not found
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (isError) {
      console.log(message);
    }
    console.log(
      'About to dispatch getExpenses() in useEffect in Dashboard.jsx'
    );

    dispatch(getExpenses());
    console.log('About to dispatch reset inside useEffect in Dashboard.jsx');
    dispatch(reset());
  }, [user, navigate, isError, message, dispatch]);

  const onCreateBudgetSubmit = (e) => {
    e.preventDefault();

    setDisplayBudgetTotal(budgetTotal);
    setRemaining(budgetTotal - totalExpenses);
    setBudgetTotal('');
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}!</h1>
        <h2>Here's Your Budgeteer Dashboard</h2>
      </section>

      <section className="main-area">
        <div className="form" id="CreateBudgetForm">
          <h1 className="h1Label">Input Budget Total Here:</h1>
          <form className="form-group" onSubmit={onCreateBudgetSubmit}>
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              name="budgetTotal"
              id="budgetTotal"
              value={budgetTotal}
              placeholder="$"
              onChange={(e) => setBudgetTotal(e.target.value)}
            />
            <div className="form-group">
              <button className="btn btn-block" type="submit">
                Add Budget Total
              </button>
            </div>
          </form>
        </div>

        <div className="allVals">
          <div className="budgetTotal">
            <h1 className="ViewLabel">Budget Total:</h1>
            <h1 className="ViewLabel">{displayBudgetTotal}</h1>
          </div>
          <div className="budgetTotal">
            <h1 className="ViewLabel">Total Expenses:</h1>
            <h1 className="ViewLabel">{totalExpenses}</h1>
          </div>
          <div className="budgetTotal">
            <h1 className="ViewLabel">Remaining:</h1>
            <h1 className="ViewLabel">{remaining}</h1>
          </div>
        </div>

        <ExpenseForm />
        <section className="content">
          <h1 className="h1Label">Your Expenses are Here:</h1>
          {expenses.length > 0 ? (
            <div className="expenses">
              {expenses.map((expense) => (
                <ExpenseLog key={expense._id} expense={expense} />
              ))}
            </div>
          ) : (
            <h3>You do not have any logged expenses yet</h3>
          )}
        </section>
      </section>
    </>
  );
}

export default Dashboard;
