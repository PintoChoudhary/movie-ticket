import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../Components/Navbar";
import Movies from "../Components/Movies";
import axios from "axios";
import { Link } from "react-router-dom";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filters, setFilters] = useState({
    genre: "",
    language: "",
  });
  const [uniqueGenres, setUniqueGenres] = useState([]);
  const [uniqueLanguages, setUniqueLanguages] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/movies/`);
        setMovies(response.data);
        setFilteredMovies(response.data);

        const genres = response.data.map(movie => movie.Genre.split(", "));
        const uniqueGenresArray = [...new Set(genres.flat())];
        setUniqueGenres(uniqueGenresArray);

        const languages = response.data.map(movie => movie.Language.split(", "));
        const uniqueLanguagesArray = [...new Set(languages.flat())];
        setUniqueLanguages(uniqueLanguagesArray);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const applyFiltersAndSort = useCallback(() => {
    let filteredResults = movies.filter(movie => {
      if (filters.genre && !movie.Genre.includes(filters.genre)) {
        return false;
      }
      if (filters.language && !movie.Language.includes(filters.language)) {
        return false;
      }
      return true;
    });

    filteredResults.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.Title.localeCompare(b.Title);
      } else {
        return b.Title.localeCompare(a.Title);
      }
    });

    setFilteredMovies(filteredResults);
  }, [movies, filters, sortOrder]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [filters, sortOrder, applyFiltersAndSort]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row mb-4">
          <div className="col">
            <label>Genre:</label>
            <select name="genre" value={filters.genre} onChange={handleFilterChange}>
              <option value="">All</option>
              {uniqueGenres.map((genre, index) => (
                <option key={index} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
          <div className="col">
            <label>Language:</label>
            <select name="language" value={filters.language} onChange={handleFilterChange}>
              <option value="">All</option>
              {uniqueLanguages.map((language, index) => (
                <option key={index} value={language}>{language}</option>
              ))}
            </select>
          </div>
          <div className="col">
            <label>Sort Order:</label>
            <button onClick={toggleSortOrder}>{sortOrder === "asc" ? "A to Z" : "Z to A"}</button>
          </div>
        </div>
        <div className="row movie-row">
          {filteredMovies.map((movie, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <Link to={`/movies/${movie.id}`}>
                <Movies movie={movie} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MoviesPage;
