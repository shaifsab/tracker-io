import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { FaChartPie } from 'react-icons/fa';
import { useBudget } from '../context/BudgetContext';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart() {
  const { getExpensesByCategory, EXPENSE_CATEGORIES, totalExpenses } = useBudget();

  const expensesByCategory = getExpensesByCategory();
  
  const chartData = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverOffset: 10
      }
    ]
  };

  Object.entries(expensesByCategory).forEach(([categoryId, amount]) => {
    const category = EXPENSE_CATEGORIES.find(cat => cat.id === categoryId);
    if (category && amount > 0) {
      chartData.labels.push(`${category.icon} ${category.name}`);
      chartData.datasets[0].data.push(amount);
      chartData.datasets[0].backgroundColor.push(category.color + '80');
      chartData.datasets[0].borderColor.push(category.color);
    }
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.parsed;
            const percentage = ((value / totalExpenses) * 100).toFixed(1);
            return `$${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (totalExpenses === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            <FaChartPie />
            Expense Breakdown
          </h2>
          <p>Visual breakdown of your expenses by category</p>
        </div>
        <div className="card-body">
          <div className="no-data">
            <FaChartPie size={48} />
            <p>No expenses to display</p>
            <p>Add some expense transactions to see the breakdown</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <FaChartPie />
          Expense Breakdown
        </h2>
        <p>Total Expenses: {formatCurrency(totalExpenses)}</p>
      </div>
      
      <div className="card-body">
        <div className="chart-container">
          <Pie data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
}
