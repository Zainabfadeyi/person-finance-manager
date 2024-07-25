import React from 'react';
import Sidebar from './app/sidebar/SideBar';
import styles from './App.module.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './app/pages/Dashboard';
import Transaction from './app/pages/Transaction';

const App = () => {
  return (
    <Router>
      <div className={styles.app}>
        <Sidebar />
        <main className={styles.mainContent}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transaction />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;