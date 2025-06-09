import axios from "axios";

const API_URL = "https://jdhexomeymknoalhuopy.supabase.co/rest/v1/quotes";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkaGV4b21leW1rbm9hbGh1b3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzNTA2NTAsImV4cCI6MjA2NDkyNjY1MH0.fcofUFsmwEMXUFKZy_2oEGw4hiXp4O8hjzZPcQB6v1k";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const quotesAPI = {
  async fetchQuotes() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },

  async createQuote(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },
};
