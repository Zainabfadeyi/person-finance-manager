import React from 'react';

import styles from './App.module.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './app/pages/Dashboard';
import Transaction from './app/pages/Transaction';
import Sidebar from './app/sidebar/SideBar';
import Account from './app/pages/Account';
import Budget from './app/pages/Budget';
import Register from './app/component/authentication/Register';
import Login from './app/component/authentication/Login';
import Layout from './app/layout/Layout';
import UserProfileForm from './app/pages/UserProfileForm';


const App = () => {
  return (
    <Router>
      <div className={styles.app}>
        
          <Routes>
          <Route path= '/login' element={<Login/>}/>
          <Route path= '/register' element={<Register/>}/>

            <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transaction />} />
            <Route path="/account" element={<Account/>}/>
            <Route path='/budget' element={<Budget/>}/>
            <Route path='/userprofile' element={<UserProfileForm/>}/>
            
            
            </Route>
          </Routes>
      
      </div>
    </Router>
  );
};

export default App;