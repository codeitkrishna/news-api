import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import axios from 'axios';
import NewsSection from './NewsSection';


//To fetch news data from the News API, we need to make an HTTP request to the API endpoint. 
// We can use the axios library to make the request.
// This function is fetches data as soon as the app is loaded.

const App = () => {
  const [newsData, setNewsData] = useState([]);
  const [error, setError] = useState('');
  const [searchVar, setSearchVar] = useState('');


  useEffect(() => {
    const fetchNewsData = async() => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            q: searchVar,
            country: 'in',
            // pageSize: 6,
            apiKey: '076ac79592c8488690e5c693ed7eb5d8', // Replace with your API key
          },
        });
        let articles = await response.data.articles;
        setNewsData(articles);
      } catch (error) {
        console.error('Error fetching news data:', error);
        setError('Failed to fetch news data. Please try again later.');
      }
    };

    fetchNewsData();
  }, [searchVar]);

  // useEffect(() => {
  //   const fetchNewsData = async() => {
  //     try {
  //       const response = await axios.get('https://newsapi.org/v2/top-headlines', {
  //         params: {
  //           q: searchVar,
  //           country: 'in',
  //           pageSize: 6,
  //           apiKey: '076ac79592c8488690e5c693ed7eb5d8', // Replace with your API key
  //         },
  //       });
  //       let articles = await response.data.articles;
  //       setNewsData(articles);
  //       console.log(articles);
  //     } catch (error) {
  //       console.error('Error fetching news data:', error);
  //       setError('Failed to fetch news data. Please try again later.');
  //     }
  //   };

  //   fetchNewsData();
  // }
  // , [searchVar]);

  return (
    //Routing is done to navigate between the home page and the article detail page.
    <Router>
      <Routes>
        <Route path="/" element={<NewsSection newsData={newsData} error={error} setSearchVar={setSearchVar}/>} />
      </Routes>
    </Router>
  );
};

export default App;
