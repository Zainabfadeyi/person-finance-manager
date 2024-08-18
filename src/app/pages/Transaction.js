import React, { useState } from 'react';
import TanStackTable from '../component/mainpage/TanStackTable'
import AddModal from '../../'


const Transaction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddExpense = (expenseData) => {
    console.log('New expense:', expenseData);
    // Handle the new expense data (e.g., update state, send to API, etc.)
  };

  return (
    <div>
      <TanStackTable/>
    </div>
  )
}

export default Transaction;