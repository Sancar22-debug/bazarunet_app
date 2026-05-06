export const aiService = {
  async analyzeFinancialData(query, data) {
    const income = data.total_income || data.totalIncome || 0;
    const expenses = data.total_expenses || data.totalExpenses || 0;
    const profit = data.profit || (income - expenses);
    const transactionCount = data.transaction_count || data.transactionCount || 0;
    const profitMargin = income > 0 ? ((profit / income) * 100).toFixed(1) : 0;

    const apiKey = import.meta.env.VITE_HF_TOKEN;

    if (!apiKey) {
      return `Please add your HuggingFace token to .env. Current: Income ${income} KGS, Expenses ${expenses} KGS, Profit ${profit} KGS.`;
    }

    try {
      const prompt = `<|system|>\nYou are a friendly assistant for BazaraNet market in Kyrgyzstan. Keep replies short.\n<|user|>\n${query}\nIncome: ${income}, Expenses: ${expenses}, Profit: ${profit}, ${transactionCount} transactions\n<|assistant|>\n`;

      const response = await fetch(
        "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B-Instruct",
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_new_tokens: 60,
              temperature: 0.7,
              return_full_text: false,
            },
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        return result[0]?.generated_text?.trim() || "";
      } else {
        const errText = await response.text();
        console.log("HF Error:", response.status, errText);
      }
    } catch (e) {
      console.error("AI Error:", e);
    }

    return `Income: ${income.toLocaleString()} KGS, Expenses: ${expenses.toLocaleString()} KGS, Profit: ${profit.toLocaleString()} KGS (${profitMargin}%).`;
  },
};