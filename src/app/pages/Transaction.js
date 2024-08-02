import React, { useState } from 'react';
import ExpenseModal from '../Components/ExpenseModal';

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
      <button onClick={openModal}>Add Transaction</button>
      <ExpenseModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAdd={handleAddExpense}
      />
    </div>
  );
};

export default Transaction;