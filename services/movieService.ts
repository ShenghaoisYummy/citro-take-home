import axios from 'axios';
import { API_CONFIG } from '../config/api';

// Define the interfaces for the movie data
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

// Define the interface for the movie details
export interface MovieDetails extends Movie {
  runtime: number;
  genres: { id: number; name: string }[];
  production_companies: { id: number; name: string; logo_path: string | null }[];
  spoken_languages: { iso_639_1: string; name: string }[];
}

// Define the interface for the search response
export interface SearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Create the axios instance for the movie API
const movieApi = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  params: {
    api_key: API_CONFIG.API_KEY,
  },
});

// Define the movie service, serch moive by title
export const movieService = {
  searchMovies: async (query: string, page: number = 1): Promise<SearchResponse> => {
    const response = await movieApi.get('/search/movie', {
      params: { query, page },
    });
    return response.data;
  },

  // Get the details of a movie
  getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
    const response = await movieApi.get(`/movie/${movieId}`);
    return response.data;
  },

  // Get the image URL for a movie
  getImageUrl: (path: string | null, size: string = 'w500'): string | null => {
    if (!path) return null;
    return `${API_CONFIG.IMAGE_BASE_URL}/${size}${path}`;
  },
};
