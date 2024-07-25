import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Dashboard', icon: 'dashboardIcon', path: '/' },
    { name: 'Account', icon: 'accountIcon', path: '/account' },
    { name: 'Budget', icon: 'budgetIcon', path: '/budget' },
    { name: 'Transactions', icon: 'transactionsIcon', path: '/transaction' },
    { name: 'Reports', icon: 'reportsIcon', path: '/reports' },
    { name: 'Settings', icon: 'settingsIcon', path: '/settings' },
  ];

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <button className={styles.toggleButton} onClick={toggleSidebar}>
        {isOpen ? '←' : '→'}
      </button>
      <div className={styles.logo}>Cash Coach</div>
      <nav className={styles.navigation}>
        <ul>
          {navItems.map((item) => (
            <li 
              key={item.name}
              className={`${location.pathname === item.path ? styles.active : ''} ${styles.navItem}`}
            >
              <span className={`${styles.icon} ${styles[item.icon + (location.pathname === item.path ? 'Selected' : '')]}`}></span>
              <span className={styles.navText}>{item.name}</span>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.bottomSection}>
        <div className={`${styles.navItem} ${styles.settingsLink}`}>
          <span className={`${styles.icon} ${styles.settingsIcon}`}></span>
          <span className={styles.navText}>Settings</span>
        </div>
        <div className={`${styles.navItem} ${styles.logoutLink}`}>
          <span className={`${styles.icon} ${styles.logoutIcon}`}></span>
          <span className={styles.navText}>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;