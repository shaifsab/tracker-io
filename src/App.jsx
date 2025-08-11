import React from 'react';
import { BudgetProvider } from './context/BudgetContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import ExpenseChart from './components/ExpenseChart';
import TransactionList from './components/TransactionList';

function App() {
  return (
    <ThemeProvider>
      <BudgetProvider>
        <div className="app">
          <Header />
          
          <main className="main-content">
            <div className="container">
              {/* Summary Cards */}
              <SummaryCards />
              
              <div className="content-grid">
                {/* Left Column */}
                <div className="left-column">
                  <TransactionForm />
                  <ExpenseChart />
                </div>
                
                {/* Right Column */}
                <div className="right-column">
                  <TransactionList />
                </div>
              </div>
            </div>
          </main>
          
          <footer className="footer">
            <div className="container">
              <p className="footer-text">
                Built with ❤️ using React, Vite, and Chart.js
              </p>
            </div>
          </footer>
        </div>
      </BudgetProvider>
    </ThemeProvider>
  );
}

export default App;
