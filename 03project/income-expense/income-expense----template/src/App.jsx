import './App.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [input, setInput] = useState({
    statement: "",
    amount: "",
    statementType: "income",
  });

  const [showError, setShowError] = useState({
    statement: false,
    amount: false,
  });

  const [statements, setStatements] = useState([]); // State to store all statements
  const [total, setTotal] = useState(0); // State for total balance

  const handleUpdateInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddNewStatement = () => {
    const { statement, amount, statementType } = input;

    // Validation
    if (!statement) {
      return setShowError({
        statement: true,
        amount: false,
      });
    } else if (!amount || isNaN(amount)) {
      return setShowError({
        statement: false,
        amount: true,
      });
    } else {
      setShowError({
        statement: false,
        amount: false,
      });

      const newStatement = {
        id: uuidv4(), // Unique ID
        statement,
        amount: parseFloat(amount).toFixed(2),
        statementType,
        date: new Date().toDateString(), // Current date
      };

      // Update statements list
      setStatements([...statements, newStatement]);

      // Update total balance
      setTotal((prevTotal) =>
        statementType === "income"
          ? prevTotal + Number(amount)
          : prevTotal - Number(amount)
      );

      // Reset input fields
      setInput({
        statement: "",
        amount: "",
        statementType: "income",
      });
    }
  };

  return (
    <main>
      {JSON.stringify(statements)}
      <div>
        <h1 className={`total-text ${total >= 0 ? "success" : "danger"}`}>₹{total}</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="income or expense"
            onChange={handleUpdateInput}
            value={input.statement}
            name="statement"
            style={
              showError.statement ? { borderColor: "rgb(206,76,76)" } : null
            }
          />
          <input
            type="number"
            placeholder="₹5000"
            onChange={handleUpdateInput}
            value={input.amount}
            name="amount"
            style={showError.amount ? { borderColor: "rgb(206,76,76)" } : null}
          />
          <select
            onChange={handleUpdateInput}
            value={input.statementType}
            name="statementType"
          >
            <option value="income">income</option>
            <option value="expense">expense</option>
          </select>
          <button onClick={handleAddNewStatement}>+</button>
        </div>

        <div>
          {statements.map((item) => (
            <div className="card" key={item.id}>
              <div className="card-info">
                <h4>{item.statement}</h4>
                <p>{item.date}</p>
              </div>
              <p
                className={`amount-text ${item.statementType === "income" ? "success" : "danger"
                  }`}
              >
                {item.statementType === "income" ? "+" : "-"}₹{item.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;