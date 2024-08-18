// tableApi.jsx
import { useSelector } from 'react-redux';
import axios from '../axios';

export const useFetchTransactions = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.user.user.id);

  const fetchTransactions = async () => {
    try {
      const apiUrl = `/transactions`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  };

  return { fetchTransactions };
};

// // You can also add functions for creating, updating, and deleting transactions
// export const createTransaction = async (transactionData) => {
//   try {
//     const response = await axios.post(API_BASE_URL, transactionData);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating transaction:", error);
//     throw error;
//   }
// };

// Add more functions as needed...