import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';

const Pokedex = () => {
  const [list, setList] = useState([]);
  const [language, setLanguage] = useState('english');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://us-central1-it-sysarch32.cloudfunctions.net/pokemon")
      .then(response => response.json())
      .then(data => {
        setList(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    // Simulate fetching data with a delay
    setTimeout(() => {
      setLoading(false);
    }, 300); // Adjust delay time as needed
  }, [currentPage]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(list.length / pageSize);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const totalPages = Math.ceil(list.length / pageSize);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pokedex">
      <div className="language-buttons">
        <button onClick={() => handleLanguageChange('english')}>English</button>
        <button onClick={() => handleLanguageChange('japanese')}>Japanese</button>
        <button onClick={() => handleLanguageChange('chinese')}>Chinese</button>
        <button onClick={() => handleLanguageChange('french')}>French</button>
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Back</button>
        {pageNumbers.map(pageNumber => (
          <button key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
            {pageNumber}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages || loading}>
          {loading ? 'Loading...' : 'Next'}
        </button>
      </div>
      <div className="pokemon-list">
        {loading ? (
          <div class ="loading">Loading...</div>
        ) : (
          list
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map(pokemon => (
              <Pokemon key={pokemon.id} pokemon={pokemon} language={language} />
            ))
        )}
      </div>
    </div>
  );
};

export default Pokedex;
