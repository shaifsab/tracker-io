import React from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { FaWallet } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-logo">
            <div className="logo-icon">
              <FaWallet />
            </div>
            <div className="logo-text">
              <h1>Budget Tracker</h1>
              <p>Manage your finances</p>
            </div>
          </div>
          <button onClick={toggleTheme} className="btn btn-secondary btn-icon">
            {isDark ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
