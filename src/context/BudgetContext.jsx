import React, { createContext, useContext, useReducer, useEffect } from 'react';

const BudgetContext = createContext();

// Predefined expense categories
export const EXPENSE_CATEGORIES = [
  { id: 'food', name: 'Food', color: '#FF6B6B', icon: '🍕' },
  { id: 'utilities', name: 'Utilities', color: '#4ECDC4', icon: '⚡' },
  { id: 'transport', name: 'Transport', color: '#45B7D1', icon: '🚗' },
  { id: 'entertainment', name: 'Entertainment', color: '#96CEB4', icon: '🎬' },
  { id: 'shopping', name: 'Shopping', color: '#FFEAA7', icon: '🛍️' },
  { id: 'health', name: 'Health', color: '#DDA0DD', icon: '🏥' },
  { id: 'education', name: 'Education', color: '#98D8C8', icon: '📚' },
  { id: 'other', name: 'Other', color: '#F7DC6F', icon: '📦' },
];

const initialState = {
  transactions: [],
  balance: 0,
  totalIncome: 0,
  totalExpenses: 0,
};

function budgetReducer(state, action) {
  switch (action.type) {
    case 'ADD_TRANSACTION': {
      const newTransaction = {
        ...action.payload,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      };
      
      const newTransactions = [...state.transactions, newTransaction];
      const totalIncome = newTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      const totalExpenses = newTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      
      return {
        ...state,
        transactions: newTransactions,
        totalIncome,
        totalExpenses,
        balance: totalIncome - totalExpenses,
      };
    }
    
    case 'DELETE_TRANSACTION': {
      const newTransactions = state.transactions.filter(t => t.id !== action.payload);
      const totalIncome = newTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      const totalExpenses = newTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      
      return {
        ...state,
        transactions: newTransactions,
        totalIncome,
        totalExpenses,
        balance: totalIncome - totalExpenses,
      };
    }
    
    case 'LOAD_DATA':
      return action.payload;
    
    default:
      return state;
  }
}

export function BudgetProvider({ children }) {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('budgetTrackerData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_DATA', payload: parsedData });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('budgetTrackerData', JSON.stringify(state));
  }, [state]);

  const addTransaction = (transaction) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  };

  const deleteTransaction = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  const getExpensesByCategory = () => {
    const expenses = state.transactions.filter(t => t.type === 'expense');
    const categoryTotals = {};
    
    expenses.forEach(expense => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount;
      } else {
        categoryTotals[expense.category] = expense.amount;
      }
    });
    
    return categoryTotals;
  };

  const value = {
    ...state,
    addTransaction,
    deleteTransaction,
    getExpensesByCategory,
    EXPENSE_CATEGORIES,
  };

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
}
