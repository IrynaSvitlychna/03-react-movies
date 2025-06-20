
import axios from 'axios';
import type { Movie } from '../types/movie';


const options = {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
};



export interface GetMovies {
  results: Movie[];
}


export const fetchMovies = async (newQuery: string): Promise<Movie[]> => {

    
    const result = await axios.get<GetMovies>(
        'https://api.themoviedb.org/3/search/movie',
    {
      ...options,
      params: {
        query: newQuery,
        include_adult: false,
        language: 'en-US',
        page: 1,
      },
    }
    );
    
    // console.log(result);
    return result.data.results;
};



