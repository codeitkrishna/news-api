import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const NewsSection = ({newsData, error}) => {

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  }
  
  return (
    
    <div className="news-container">
      <header className="header">
       <h1 className="logo">Your News Source</h1>
     </header>
      <div className="title">
        <h2>Latest Headlines</h2>
      </div>
  
      <div className="news-cards">
        {newsData.map((article, index) => (
          <div key={index} className="news-card">
            <Link to={`/article/${index}`}>
              <h3 className="news-card-title">{article.title}</h3>
            </Link>
            <p className="news-card-source">Source: {article.source.name}</p>
            <p className="news-card-date">Date: {new Date(article.publishedAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

    </div>
  );
  
};

export default NewsSection;
