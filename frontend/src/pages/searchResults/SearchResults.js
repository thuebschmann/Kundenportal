import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import SearchResultsTable from './SearchResultsTable';

export default function SearchResults() {
  const pathname = window.location.href;
  const searchQuery = pathname.substring(9 + pathname.indexOf('search'));
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const searchHandler = async (searchQuery) => {
    try {
      const response = await axios.post('/search', { searchQuery });
      setSearchResults(response.data);
    } catch (error) {
      setError('Search Error: ' + error);
    }
  };

  useEffect(() => {
    searchHandler(searchQuery);
  }, [searchQuery]);

  const groupedResults = useMemo(() => {
    return searchResults.reduce((acc, result) => {
      const { tableName } = result;
      if (!acc[tableName]) {
        acc[tableName] = [];
      }
      acc[tableName].push(result);
      return acc;
    }, {});
  }, [searchResults]);

  return (
    <div>
      {error && <Typography>{error}</Typography>}
      {Object.keys(groupedResults).length === 0 ? (
        <Typography>No results found</Typography>
      ) : (
        <SearchResultsTable groupedResults={groupedResults} />
      )}
    </div>
  );
}
