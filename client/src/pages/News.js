import React, { useState, useEffect } from "react";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);
  //const [page, setPage] = useState(1);
  //const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(null);
  //const [totalResults, setTotalResults] = useState(0);
  //const pageSize = 5;

  useEffect(() => {
    const fetchNews = async () => {
      const res = await axios.get(`http://localhost:5001/news`);
      setNews(res.data.articles);
    };
    fetchNews();
  }, []);

  return <h1>News</h1>;
};
export default News;
