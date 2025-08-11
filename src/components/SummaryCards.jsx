import React from 'react';
import { FaArrowUp, FaArrowDown, FaWallet } from 'react-icons/fa';
import { useBudget } from '../context/BudgetContext';

export default function SummaryCards() {
  const { balance, totalIncome, totalExpenses } = useBudget();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="summary-cards">
      <div className="card">
        <div className="card-body">
          <div className="summary-card-content">
            <div className="summary-info">
              <p className="summary-title">Total Balance</p>
              <p className="summary-amount balance">{formatCurrency(balance)}</p>
            </div>
            <div className="summary-icon balance">
              <FaWallet />
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-body">
          <div className="summary-card-content">
            <div className="summary-info">
              <p className="summary-title">Total Income</p>
              <p className="summary-amount income">{formatCurrency(totalIncome)}</p>
            </div>
            <div className="summary-icon income">
              <FaArrowUp />
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-body">
          <div className="summary-card-content">
            <div className="summary-info">
              <p className="summary-title">Total Expenses</p>
              <p className="summary-amount expense">{formatCurrency(totalExpenses)}</p>
            </div>
            <div className="summary-icon expense">
              <FaArrowDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
