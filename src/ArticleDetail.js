import React from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

const ArticleDetail = ({ newsData, error }) => {
  const { index } = useParams();
  const article = newsData[index];
  console.log(article);

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  }
  
  return (
    <main className="article-detail">
      <header className="article-detail-header">
        <h1 className="article-detail-title">{article.title}</h1>
        <p className="article-detail-meta">
          Source: {article.source.name} - Date:{" "}
          {new Date(article.publishedAt).toLocaleDateString()}
        </p>
      </header>
  
      <section className="article-detail-content">
        <img
          src={article.urlToImage}
          alt= "Image unavailable"
          className="article-detail-image"
        />
  
        {article.content ? (
          <div className="article-detail-text">
            <p>{article.content}</p>
          </div>
        ) : (
          
          <div className="article-detail-text">
            <p>Content not available</p>
          </div>
        )}
      </section>
    </main>
  );
  
};

export default ArticleDetail;

  