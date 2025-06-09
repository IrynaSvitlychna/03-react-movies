import { useState } from "react";
// import axios from "axios";
import SearchBar from '../SearchBar/SearchBar';
import Loader from "../Loader/Loader";
import css from './App.module.css';
import type { Movie } from "../../types/movie";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import toast, { Toaster } from 'react-hot-toast';
import { fetchMovies } from '../../services/movieService';
import MovieModal from '../MovieModal/MovieModal';



export default function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
   };
  


  const handleSearch = async (newQuery: string) => {

    try {
      setIsLoading(true);
      setIsError(false);
      const newMovies = await fetchMovies(newQuery);
      if (newMovies.length === 0) {
        toast.error('No movies found for your request.');
      }
     
      setMovies(newMovies);
    } catch {
      setIsError(true);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
    
  };


  return (
    
    <div className={css.app}>
      < SearchBar onSubmit={handleSearch} />
      <Toaster />
      { isLoading && <Loader />}
      { isError && <ErrorMessage/>}
      {movies.length > 0 && <MovieGrid onSelect={openModal} movies={movies} />}
      {selectedMovie !== null && (<MovieModal onClose={closeModal} movie={selectedMovie} />)}   
    </div>     
  );
    
}


