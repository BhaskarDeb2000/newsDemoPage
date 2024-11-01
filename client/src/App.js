import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0); // Tracks total articles
  const pageSize = 5;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null); // Reset error on new request
      try {
        const response = await axios.get(
          `http://localhost:5001/news?page=${page}&pageSize=${pageSize}`
        );
        setNews(response.data.articles);
        setTotalResults(response.data.totalResults);
      } catch (error) {
        setError("Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page]);

  const nextPage = () => {
    if (page < Math.ceil(totalResults / pageSize)) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="App">
      <h1>Latest Tesla News</h1>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {news.map((article, index) => (
            <li key={index}>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className="pagination">
        <button onClick={prevPage} disabled={page === 1}>
          &larr; Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={nextPage}
          disabled={page >= Math.ceil(totalResults / pageSize)}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}

export default App;
