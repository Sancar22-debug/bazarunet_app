export const ragService = {
  retrieveRelevantData(query, transactions) {
    const keywords = query.toLowerCase().split(" ").filter((w) => w.length > 3);
    const relevant = transactions.filter((t) =>
      keywords.some(
        (k) =>
          t.category.toLowerCase().includes(k) ||
          t.description.toLowerCase().includes(k)
      )
    );

    return {
      relevantTransactions: relevant.slice(0, 5),
      summary: `Found ${relevant.length} relevant transactions.`,
      insights: [],
    };
  },

  analyzeTransactions(transactions) {
    const expenses = transactions.filter((t) => t.type === "expense");
    const income = transactions.filter((t) => t.type === "income");

    return {
      topExpenses: expenses.sort((a, b) => b.amount - a.amount).slice(0, 5),
      topIncome: income.sort((a, b) => b.amount - a.amount).slice(0, 5),
      patterns: [],
      timeAnalysis: { busiestDay: "N/A", busiestMonth: "N/A", averageDaily: 0 },
    };
  },
};