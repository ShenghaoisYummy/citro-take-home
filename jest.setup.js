global.__DEV__ = true;
require('@testing-library/jest-native/extend-expect');

// Mock expo modules
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
  useLocalSearchParams: () => ({}),
  Stack: { Screen: jest.fn() },
}));
jest.mock('expo-constants', () => ({}));
jest.mock('@expo/vector-icons', () => ({ Ionicons: 'Ionicons' }));

// Mock axios
jest.mock('axios', () => {
  const get = jest.fn();
  return {
    create: jest.fn(() => ({ get })),
    default: {
      create: jest.fn(() => ({ get })),
    },
  };
});
