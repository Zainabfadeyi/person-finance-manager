import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { useDispatch } from '../../api/hook';
import { clearUser } from '../../api/slices/userSlices';
import { logout } from '../../api/slices/authSlices';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Dashboard', icon: 'dashboardIcon', path: '/dashboard' },
    { name: 'Account', icon: 'accountIcon', path: '/account' },
    { name: 'Budget', icon: 'budgetIcon', path: '/budget' },
    { name: 'Transactions', icon: 'transactionsIcon', path: '/transactions' }
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {

    dispatch(logout());
    dispatch(clearUser());

    navigate("/login")
  }

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
              {/* <span className={`${styles.icon} ${styles[item.icon + (location.pathname === item.path ? 'Selected' : '')]}`}></span>
              <span className={styles.navText}>{item.name}</span> */}
               <Link to={item.path} className={styles.navLink}>
                <span className={`${styles.icon} ${styles[item.icon + (location.pathname === item.path ? 'Selected' : '')]}`}></span>
                <span className={styles.navText}>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.bottomSection}>
        <Link to="/userprofile" className={`${styles.navItem} ${styles.settingsLink}`}>
          <span className={`${styles.icon} ${styles.settingsIcon}`}></span>
          <span className={styles.navText}>Profile</span>
        </Link>
        <div className={`${styles.navItem} ${styles.logoutLink}`} onClick={handleLogout}>
          <span className={`${styles.icon} ${styles.logoutIcon}`}></span>
          <span className={styles.navText}>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;