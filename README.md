# Budget Tracker 💰

A modern and sleek financial tracker application built with React and Vite to help you manage and visualize your expenses and income.

## 🌟 Features

### Core Functionality
- **Add Income & Expense Entries**: Record your financial transactions with ease
- **Expense Categorization**: Organize expenses into predefined categories (Food, Utilities, Transport, Entertainment, Shopping, Health, Education, Other)
- **Pie Chart Visualization**: Interactive Chart.js pie chart showing expense breakdown by category
- **Transaction Management**: View, sort, and delete transactions with confirmation

### Modern UI/UX
- **Dark & Light Mode**: Toggle between themes with automatic system preference detection
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern Design Language**: Clean, professional interface with smooth animations
- **React Icons**: Beautiful icons throughout the application
- **Hover Effects**: Interactive elements with visual feedback

### Technical Features
- **Context API**: State management for budget data and theme preferences
- **Local Storage**: Persistent data storage - your data is saved automatically
- **Real-time Updates**: Live calculation of balance, income, and expenses
- **Currency Formatting**: Professional USD currency formatting
- **Data Validation**: Input validation and error handling

## 🛠️ Technologies Used

- **Frontend Framework**: React 18 with Vite
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: React Icons (Font Awesome, Material Design)
- **Styling**: Pure CSS with CSS Custom Properties (CSS Variables)
- **State Management**: React Context API with useReducer
- **Storage**: Browser Local Storage API

## 🚀 Getting Started

### Prerequisites
- Node.js (version 20.13.1 or higher)
- npm (version 10.5.2 or higher)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## 📱 Usage

### Adding Transactions
1. Select transaction type (Income or Expense)
2. Enter the amount
3. Add a description
4. For expenses, choose a category
5. Click "Add Income" or "Add Expense"

### Managing Categories
The app includes 8 predefined expense categories:
- 🍕 Food
- ⚡ Utilities
- 🚗 Transport
- 🎬 Entertainment
- 🛍️ Shopping
- 🏥 Health
- 📚 Education
- 📦 Other

### Viewing Analytics
- **Summary Cards**: Quick overview of balance, total income, and expenses
- **Pie Chart**: Visual breakdown of expenses by category with percentages
- **Transaction List**: Chronological list of all transactions with delete functionality

### Theme Switching
- Click the sun/moon icon in the header to toggle themes
- The app remembers your preference and applies it automatically on future visits
- Supports system preference detection for automatic theme selection

## 🎨 Key Features Highlights

✅ **Modern React Architecture** - Built with React 18, Context API, and hooks
✅ **Beautiful Charts** - Interactive pie charts with Chart.js integration
✅ **Dark/Light Theme** - Seamless theme switching with system preference
✅ **Responsive Design** - Works perfectly on all device sizes
✅ **Data Persistence** - Your data is automatically saved locally
✅ **Real-time Updates** - Balance and totals update instantly
✅ **Category Management** - Pre-defined expense categories with icons
✅ **Transaction History** - View and manage all your transactions
✅ **Input Validation** - Proper form validation and error handling
✅ **Professional UI** - Clean, modern interface with smooth animations

---

Built with ❤️ by shaifsab

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
