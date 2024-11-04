import React, { useState, useEffect } from "react";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(5);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 5;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null); // Reset error on new request
      try {
        const response = await axios.get(
          `https://news-demo-backend-api.vercel.app/news?page=${page}&pageSize=${pageSize}`
        );
        setNews(response.data.articles);
        setTotalResults(response.data.totalResults);
      } catch (error) {
        setError(error.message);
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
    <div>
      <div>
        {error ? (
          <p>{error}</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          news.map((i, index) => (
            <div key={index}>
              <ul>
                <li>{i.title}</li>
              </ul>
            </div>
          ))
        )}
      </div>
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
};
export default News;
