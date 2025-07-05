import axios from 'axios';
import { API_CONFIG } from '../config/api';

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

export interface MovieDetails extends Movie {
  runtime: number;
  genres: { id: number; name: string }[];
  production_companies: { id: number; name: string; logo_path: string | null }[];
  spoken_languages: { iso_639_1: string; name: string }[];
}

export interface SearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const movieApi = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  params: {
    api_key: API_CONFIG.API_KEY,
  },
});

export const movieService = {
  searchMovies: async (query: string, page: number = 1): Promise<SearchResponse> => {
    const response = await movieApi.get('/search/movie', {
      params: { query, page },
    });
    return response.data;
  },

  getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
    const response = await movieApi.get(`/movie/${movieId}`);
    return response.data;
  },

  getImageUrl: (path: string | null, size: string = 'w500'): string | null => {
    if (!path) return null;
    return `${API_CONFIG.IMAGE_BASE_URL}/${size}${path}`;
  },
};
