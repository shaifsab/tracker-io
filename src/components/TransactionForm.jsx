import React, { useState } from 'react';
import { FaPlus, FaDollarSign } from 'react-icons/fa';
import { useBudget } from '../context/BudgetContext';

export default function TransactionForm() {
  const { addTransaction, EXPENSE_CATEGORIES } = useBudget();
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    description: '',
    category: 'food'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.description) {
      alert('Please fill in all fields');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (amount <= 0) {
      alert('Amount must be greater than 0');
      return;
    }

    addTransaction({
      type: formData.type,
      amount: amount,
      description: formData.description.trim(),
      category: formData.type === 'expense' ? formData.category : 'income'
    });

    setFormData({
      type: 'expense',
      amount: '',
      description: '',
      category: 'food'
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h2 className="card-title">
          <FaPlus />
          Add Transaction
        </h2>
        <p>Record your income and expenses</p>
      </div>
      
      <div className="card-body">
        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-group">
            <label className="form-label">Transaction Type</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={formData.type === 'income'}
                  onChange={handleChange}
                />
                <span className="income-text">Income</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={formData.type === 'expense'}
                  onChange={handleChange}
                />
                <span className="expense-text">Expense</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="amount" className="form-label">Amount</label>
            <div className="input-with-icon">
              <FaDollarSign className="input-icon" />
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="form-input with-icon"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description..."
              className="form-input"
              required
            />
          </div>

          {formData.type === 'expense' && (
            <div className="form-group">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select"
              >
                {EXPENSE_CATEGORIES.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            className={`btn btn-full ${formData.type === 'income' ? 'btn-success' : 'btn-danger'}`}
          >
            <FaPlus />
            Add {formData.type === 'income' ? 'Income' : 'Expense'}
          </button>
        </form>
      </div>
    </div>
  );
}
