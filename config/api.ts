import Constants from 'expo-constants';
import { TMDB_ACCESS_TOKEN } from '@env';
const extraConfig = Constants.expoConfig?.extra || {};

export const API_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  ACCESS_TOKEN: TMDB_ACCESS_TOKEN,
};

export const IMAGE_SIZES = {
  poster: 'w500',
  backdrop: 'w1280',
  profile: 'w185',
};
