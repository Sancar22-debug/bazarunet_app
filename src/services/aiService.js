export const aiService = {
  async analyzeFinancialData(query, data) {
    try {
      const income = data.total_income || data.totalIncome || 0;
      const expenses = data.total_expenses || data.totalExpenses || 0;
      const profit = data.profit || (income - expenses);
      const transactionCount = data.transaction_count || data.transactionCount || 0;
      const profitMargin = income > 0 ? ((profit / income) * 100).toFixed(1) : 0;

      let advice = "";
      if (profit > 0) {
        advice = `Great! You have a profit of ${profit.toLocaleString()} KGS (${profitMargin}% margin). `;
      } else {
        advice = `Warning: You're currently at a loss of ${Math.abs(profit).toLocaleString()} KGS. Consider reducing expenses or increasing sales. `;
      }

      const queryLower = query.toLowerCase();
      if (queryLower.includes("profit") || queryLower.includes("loss")) {
        return `${advice}Your net profit is ${profit.toLocaleString()} KGS from ${income.toLocaleString()} KGS income minus ${expenses.toLocaleString()} KGS expenses.`;
      }
      if (queryLower.includes("income") || queryLower.includes("sales")) {
        return `Total income: ${income.toLocaleString()} KGS from ${transactionCount} transactions. Your average per transaction is ${Math.round(income / Math.max(transactionCount, 1)).toLocaleString()} KGS.`;
      }
      if (queryLower.includes("expense") || queryLower.includes("spend")) {
        return `Total expenses: ${expenses.toLocaleString()} KGS. This is ${income > 0 ? ((expenses / income) * 100).toFixed(1) : 0}% of your income. Focus on reducing top expense categories.`;
      }
      if (queryLower.includes("tip") || queryLower.includes("advice") || queryLower.includes("recommend")) {
        if (profit > 0) {
          return `Tips: 1) Set aside 10-20% of profit for savings. 2) Track daily sales to identify peak hours. 3) Consider wholesale for bulk orders.`;
        }
        return `Tips: 1) Review all expense categories for savings. 2) Increase inventory turnover. 3) Focus on high-margin products. 4) Negotiate better supplier prices.`;
      }

      return `${advice}You have ${transactionCount} transactions. Income: ${income.toLocaleString()} KGS, Expenses: ${expenses.toLocaleString()} KGS, Profit: ${profit.toLocaleString()} KGS (${profitMargin}%). Ask me about income, expenses, profit, or get advice!`;
    } catch (e) {
      return "Sorry, something went wrong. Please try again.";
    }
  },
};