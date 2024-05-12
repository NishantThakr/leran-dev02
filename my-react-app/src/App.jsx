import React, { useState, useEffect } from 'react';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(storedExpenses);
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const calculateTotalCost = () => {
    return expenses.reduce((total, expense) => total + parseFloat(expense.price), 0);
  };

  const handleAddExpense = () => {
    if (itemName.trim() && itemPrice.trim()) {
      if (editIndex === -1) {
        setExpenses([...expenses, { name: itemName, price: itemPrice }]);
      } else {
        const updatedExpenses = [...expenses];
        updatedExpenses[editIndex] = { name: itemName, price: itemPrice };
        setExpenses(updatedExpenses);
        setEditIndex(-1);
      }
      setItemName('');
      setItemPrice('');
    }
  };

  const handleEditExpense = (index) => {
    const expense = expenses[index];
    setItemName(expense.name);
    setItemPrice(expense.price);
    setEditIndex(index);
  };

  const handleRemoveExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  return (
    <div className="container">
      <h2 className="header">Expense Tracker</h2>
      <div className="inputGroup">
        <input
          className="input"
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          className="input"
          type="number"
          placeholder="Price"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
        />
        <button className="button" onClick={handleAddExpense}>
          {editIndex === -1 ? 'Add Expense' : 'Update Expense'}
        </button>
      </div>
      <ul className="expenseList">
        {expenses.map((expense, index) => (
          <li className="expenseItem" key={index}>
            <span>{expense.name} - ₹{expense.price}</span>
            <div>
              <button className="button" onClick={() => handleEditExpense(index)}>
                Edit
              </button>
              <button className="button" onClick={() => handleRemoveExpense(index)}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p className="totalCost">Total Cost: ₹{calculateTotalCost().toFixed(2)}</p>
    </div>
  );
};

export default ExpenseTracker;