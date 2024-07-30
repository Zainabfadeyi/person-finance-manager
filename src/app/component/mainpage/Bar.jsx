// Bar.js
import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { TRANSACTIONS } from "../../mockData"; // Ensure this path is correct
import styles from "../../../styles/dashboard.module.css";

// Function to group data by month and categorize as income and expenses
const groupDataByMonth = (transactions) => {
  const groupedData = [];
  const currentDate = new Date();
  
  // Get the last four months
  for (let i = 0; i < 4; i++) {
    const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const monthName = monthDate.toLocaleString('default', { month: 'long' });
    const year = monthDate.getFullYear();
    
    // Initialize income and expenses for each month
    groupedData.push({ month: `${monthName} ${year}`, income: 0, expenses: 0 });
  }

  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.transactionDate);
    const month = transactionDate.toLocaleString('default', { month: 'long' });
    const year = transactionDate.getFullYear();
    const monthYear = `${month} ${year}`;
    
    // Find the corresponding month in the groupedData array
    const monthIndex = groupedData.findIndex((item) => item.month === monthYear);
    if (monthIndex !== -1) {
      if (transaction.amount > 0) {
        groupedData[monthIndex].income += transaction.amount;
      } else {
        groupedData[monthIndex].expenses += Math.abs(transaction.amount); // Make sure expenses are positive
      }
    }
  });

  return groupedData;
};

const barChartData = groupDataByMonth(TRANSACTIONS);

const Bar = () => {
  return (
    <div className={styles.barContainer}>
      <div style={{ height: "380px", transformOrigin: "center" }}>
        <ResponsiveBar
          data={barChartData}
          keys={["income", "expenses"]}
          indexBy="month"
          margin={{ top: 50, right: 100, bottom: 70, left: 90 }}
          borderWidth={2}
          padding={0.8}
          groupMode="grouped"
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={["#0072BB", "#909090"]} 
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          borderRadius={0}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            // tickSize: 5,
            // tickPadding: 5,
            // tickRotation: 0,
            // legend: 'Month',
            // legendPosition: 'middle',
            // legendOffset: 32,
          }}
          axisLeft={{
            // tickSize: 5,
            // tickPadding: 5,
            // tickRotation: 0,
            // legend: 'Amount',
            // legendPosition: 'middle',
            // legendOffset: -40,
          }}
          enableLabel={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          role="application"
          barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in month: ${e.indexValue}`}
        />
      </div>
    </div>
  );
};

export default Bar;
