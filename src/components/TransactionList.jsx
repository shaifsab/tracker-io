import React from 'react';
import { FaList, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useBudget } from '../context/BudgetContext';

export default function TransactionList() {
  const { transactions, deleteTransaction, EXPENSE_CATEGORIES } = useBudget();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryInfo = (categoryId) => {
    return EXPENSE_CATEGORIES.find(cat => cat.id === categoryId) || {
      name: 'Unknown',
      icon: '❓',
      color: '#6b7280'
    };
  };

  const handleDelete = (id, description) => {
    if (window.confirm(`Are you sure you want to delete "${description}"?`)) {
      deleteTransaction(id);
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <FaList />
          Recent Transactions
        </h2>
        <p>{transactions.length} transaction{transactions.length !== 1 ? 's' : ''} total</p>
      </div>
      
      <div className="card-body">
        {sortedTransactions.length === 0 ? (
          <div className="no-data">
            <FaList size={48} />
            <p>No transactions yet</p>
            <p>Add your first income or expense to get started</p>
          </div>
        ) : (
          <div className="transaction-list">
            {sortedTransactions.map((transaction) => {
              const isIncome = transaction.type === 'income';
              const categoryInfo = isIncome ? 
                { name: 'Income', icon: '💰', color: '#10b981' } : 
                getCategoryInfo(transaction.category);
              
              return (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-icon" style={{
                    backgroundColor: categoryInfo.color + '20'
                  }}>
                    {isIncome ? (
                      <FaArrowUp style={{ color: categoryInfo.color }} />
                    ) : (
                      <FaArrowDown style={{ color: categoryInfo.color }} />
                    )}
                  </div>
                  
                  <div className="transaction-details">
                    <div className="transaction-description">
                      {transaction.description}
                    </div>
                    <div className="transaction-meta">
                      <span>{categoryInfo.icon} {categoryInfo.name}</span>
                      <span>{formatDate(transaction.date)}</span>
                    </div>
                  </div>
                  
                  <div className="transaction-amount-section">
                    <div className={`transaction-amount ${isIncome ? 'income' : 'expense'}`}>
                      {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </div>
                    <button
                      onClick={() => handleDelete(transaction.id, transaction.description)}
                      className="delete-btn"
                      title="Delete transaction"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
