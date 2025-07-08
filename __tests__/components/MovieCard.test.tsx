import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MovieCard } from '../../components/MovieCard';
import { Movie } from '../../services/movieService';

// Mock expo vector icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

// Mock movieService
jest.mock('../../services/movieService', () => ({
  movieService: {
    getImageUrl: jest.fn((path: string | null, size: string = 'w500') => {
      if (!path) return null;
      return `https://image.tmdb.org/t/p/${size}${path}`;
    }),
  },
}));

describe('MovieCard Component', () => {
  const mockOnPress = jest.fn();

  const mockMovie: Movie = {
    id: 1,
    title: 'The Dark Knight',
    overview:
      'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdrop_path: '/qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg',
    release_date: '2008-07-18',
    vote_average: 9.0,
    vote_count: 32000,
    genre_ids: [28, 80, 18],
    adult: false,
    original_language: 'en',
    original_title: 'The Dark Knight',
    popularity: 123.456,
    video: false,
  };

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it('renders correctly with movie data', () => {
    const { getByText } = render(<MovieCard movie={mockMovie} onPress={mockOnPress} />);

    expect(getByText('The Dark Knight')).toBeTruthy();
    expect(getByText('2008')).toBeTruthy();
    expect(getByText('9.0')).toBeTruthy();
    expect(getByText('32,000 votes')).toBeTruthy();
    expect(getByText('Watch Now')).toBeTruthy();
    expect(getByText('View movie details')).toBeTruthy();
  });

  it('displays movie overview correctly', () => {
    const { getByText } = render(<MovieCard movie={mockMovie} onPress={mockOnPress} />);

    expect(getByText(/When the menace known as the Joker/)).toBeTruthy();
    expect(getByText('Overview')).toBeTruthy();
  });

  it('handles missing poster path gracefully', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };
    const { getByText } = render(<MovieCard movie={movieWithoutPoster} onPress={mockOnPress} />);

    expect(getByText('The Dark Knight')).toBeTruthy();
    expect(getByText('No Image')).toBeTruthy();
  });

  it('handles missing release date gracefully', () => {
    const movieWithoutDate = { ...mockMovie, release_date: '' };
    const { getByText } = render(<MovieCard movie={movieWithoutDate} onPress={mockOnPress} />);

    expect(getByText('N/A')).toBeTruthy();
  });

  it('handles missing overview gracefully', () => {
    const movieWithoutOverview = { ...mockMovie, overview: '' };
    const { getByText } = render(<MovieCard movie={movieWithoutOverview} onPress={mockOnPress} />);

    expect(getByText('No description available for this movie.')).toBeTruthy();
  });

  it('displays rating correctly', () => {
    const { getByText } = render(<MovieCard movie={mockMovie} onPress={mockOnPress} />);

    expect(getByText('9.0')).toBeTruthy();
  });

  it('handles zero vote count gracefully', () => {
    const movieWithoutVotes = { ...mockMovie, vote_count: 0 };
    const { queryByText } = render(<MovieCard movie={movieWithoutVotes} onPress={mockOnPress} />);

    // Should not display vote count when it's 0
    expect(queryByText('0 votes')).toBeNull();
  });

  it('formats vote count correctly', () => {
    const movieWithManyVotes = { ...mockMovie, vote_count: 1234567 };
    const { getByText } = render(<MovieCard movie={movieWithManyVotes} onPress={mockOnPress} />);

    expect(getByText('1,234,567 votes')).toBeTruthy();
  });

  it('displays year correctly from release date', () => {
    const movieWith2023Date = { ...mockMovie, release_date: '2023-12-25' };
    const { getByText } = render(<MovieCard movie={movieWith2023Date} onPress={mockOnPress} />);

    expect(getByText('2023')).toBeTruthy();
  });

  it('handles invalid release date format', () => {
    const movieWithBadDate = { ...mockMovie, release_date: 'invalid-date' };
    const { getByText } = render(<MovieCard movie={movieWithBadDate} onPress={mockOnPress} />);

    expect(getByText('N/A')).toBeTruthy();
  });

  it('renders all required UI elements', () => {
    const { getByText } = render(<MovieCard movie={mockMovie} onPress={mockOnPress} />);

    // Check for key UI elements
    expect(getByText('The Dark Knight')).toBeTruthy();
    expect(getByText('Overview')).toBeTruthy();
    expect(getByText('Watch Now')).toBeTruthy();
    expect(getByText('View movie details')).toBeTruthy();
  });

  it('handles very long movie titles gracefully', () => {
    const movieWithLongTitle = {
      ...mockMovie,
      title:
        'This is a very long movie title that should be truncated or handled gracefully by the component',
    };
    const { getByText } = render(<MovieCard movie={movieWithLongTitle} onPress={mockOnPress} />);

    expect(getByText(/This is a very long movie title/)).toBeTruthy();
  });

  it('displays floating badges correctly positioned', () => {
    const { getByText } = render(<MovieCard movie={mockMovie} onPress={mockOnPress} />);

    // Year badge
    expect(getByText('2008')).toBeTruthy();

    // Rating badge
    expect(getByText('9.0')).toBeTruthy();
  });
});
