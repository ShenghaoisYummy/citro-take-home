import { jest } from '@jest/globals';

jest.mock('expo', () => ({}), { virtual: true });
jest.mock('expo-constants', () => ({
  default: { expoConfig: { extra: {} } },
}));

jest.mock(
  '@env',
  () => ({
    TMDB_ACCESS_TOKEN: 'test-token',
  }),
  { virtual: true }
);
