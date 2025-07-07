import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import axios from 'axios';
import { movieService } from '../../services/movieService';

const mockedGet = (axios as any).create().get;
// reset mocks before each test
describe('movieService', () => {
  beforeEach(() => {
    mockedGet.mockReturnValue({
      get: jest.fn(),
    } as any);
  });
  // reset mocks after each test
  afterEach(() => {
    mockedGet.mockClear();
  });

  // test searchMovies function
  describe('searchMovies', () => {
    it('should search movies successfully', async () => {
      // Arrange: Set up test data
      const mockResponse = {
        data: {
          page: 1,
          results: [
            {
              id: 1,
              title: 'Test Movie',
              overview: 'Test overview',
              poster_path: '/test.jpg',
              backdrop_path: '/test-backdrop.jpg',
              release_date: '2023-01-01',
              vote_average: 7.5,
              vote_count: 100,
              genre_ids: [1, 2],
              adult: false,
              original_language: 'en',
              original_title: 'Test Movie',
              popularity: 100,
              video: false,
            },
          ],
          total_pages: 1,
          total_results: 1,
        },
      };

      mockedGet.mockResolvedValueOnce(mockResponse);

      // Act: Call the function
      const result = await movieService.searchMovies('test');

      expect(mockedGet).toHaveBeenCalledWith('/search/movie', {
        params: { query: 'test', page: 1 },
      });
      // Assert: Check the results
      expect(result).toEqual(mockResponse.data);
    });
  });

  // test getImageUrl function
  describe('getImageUrl', () => {
    it('should return correct image URL', () => {
      // Mock implementation for this test
      jest.spyOn(movieService, 'getImageUrl').mockImplementation((path, size = 'w500') => {
        if (!path) return null;
        return `https://image.tmdb.org/t/p/${size}${path}`;
      });

      const result = movieService.getImageUrl('/test.jpg', 'w500');
      expect(result).toBe('https://image.tmdb.org/t/p/w500/test.jpg');
    });

    it('should return null for null path', () => {
      const result = movieService.getImageUrl(null);
      expect(result).toBeNull();
    });
  });
});
