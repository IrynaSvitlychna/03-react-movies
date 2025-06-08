
import axios from 'axios';
import type { Movie } from '../types/movie';

// const url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';

const options = {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDA1NDY1M2U0MzEwNjJmMmFmMzJmNTA1ZWVjOGFjNiIsIm5iZiI6MTcxMjQ0MjkxOS4zOSwic3ViIjoiNjYxMWNlMjdjNjhiNjkwMTdkMDRjMzYxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.d05UvpHfSu8jyNtstGmIUSpImrw1rHDGoFcQ6YxOEcM`,
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
    
    console.log(result);
    return result.data.results;
};



