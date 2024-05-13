import React, { useState } from 'react';
import './App.css';

const NewsSection = ({newsData, error, setSearchVar}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleSearchChange = (e) => {
    setSearchVar(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNewsData = newsData.slice(startIndex, endIndex);

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  }

  const NewsCard = ({ article, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleReadMoreClick = (event) => {
      event.preventDefault();
      setIsExpanded(!isExpanded);
    };

    return (
      <div key={index} className="news-card">
        <div class="news-card-layout">
        <img src={article.urlToImage}/>
        <h3 className="news-card-title">{article.title}</h3>
        </div>
        
        <p className="news-card-source">Source: {article.source.name}</p>
        <p className="news-card-date">Date: {new Date(article.publishedAt).toLocaleDateString()}</p>
        <a href="#" onClick={handleReadMoreClick}>
          {isExpanded ? 'Read less...' : 'Read more...'}
        </a>
        {isExpanded && (
          <>
            <p className="news-card-content">{article.content}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Go to article</a>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="news-container">
      <header className="header">
       <h1 className="logo">Your News Source</h1>
       <input type="text" placeholder="Search for what you'd like to read about" class="search" onChange={handleSearchChange} />
     </header>
      <div className="title">
        <h2>Latest Headlines</h2>
      </div>
  
      <div className="news-cards">
      {currentNewsData.map((article, index) => (
        <NewsCard key={index} article={article} index={index} />
      ))}
    </div>

      <div className="pagination">
        {Array(Math.ceil(newsData.length / itemsPerPage)).fill().map((_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;