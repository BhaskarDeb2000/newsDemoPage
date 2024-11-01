import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5001;
const NEWS_API_KEY = "538c5a306db14eafb5fc3cf1e6a6492e";

app.use(express.json());
app.use(cors());

app.get("/news", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 5;

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=tesla&from=2024-10-01&sortBy=publishedAt&pageSize=${pageSize}&page=${page}&apiKey=${NEWS_API_KEY}`
    );
    // Send only necessary data to the client
    res.json({
      articles: response.data.articles,
      totalResults: response.data.totalResults,
    });
  } catch (error) {
    console.error(
      "Error fetching news:",
      error.response?.data || error.message
    );

    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
