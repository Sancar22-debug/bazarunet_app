export const aiService = {
  async analyzeFinancialData(query, data, history) {
    const apiKey = import.meta.env.VITE_HF_API_KEY;

    if (!apiKey) {
      return `[Mock AI Response]: Based on your query "${query}", your total income is ${data.totalIncome} KGS and expenses are ${data.totalExpenses} KGS. Please add VITE_HF_API_KEY to your .env file to enable real AI analysis.`;
    }

    const prompt = `You are a financial AI for BazaraNet. User asked: ${query}. Data: Income ${data.totalIncome}, Expenses ${data.totalExpenses}. Reply naturally in English.`;

    try {
      const response = await fetch("https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta", {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: prompt,
          parameters: { max_new_tokens: 150 },
        }),
      });
      const result = await response.json();
      return result[0]?.generated_text?.replace(prompt, "").trim() || "Analysis complete.";
    } catch (e) {
      return "Sorry, I am having trouble connecting to the AI service right now.";
    }
  },
};