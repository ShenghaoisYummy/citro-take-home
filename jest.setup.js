global.__DEV__ = true;
require('@testing-library/jest-native/extend-expect');

// Patch StyleSheet.flatten if missing
jest.mock('react-native/Libraries/StyleSheet/StyleSheet', () => {
  const actual = jest.requireActual('react-native/Libraries/StyleSheet/StyleSheet');
  if (!actual.flatten) {
    actual.flatten = (style) => style;
  }
  return actual;
});

// Expo related mocks
jest.mock('@expo/vector-icons', () => ({ Ionicons: 'Ionicons' }));

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
  useLocalSearchParams: () => ({}),
  Stack: { Screen: jest.fn() },
}));

jest.mock('expo-constants', () => ({}));

// Axios mock
jest.mock('axios', () => {
  const get = jest.fn();
  return {
    create: jest.fn(() => ({ get })),
    default: {
      create: jest.fn(() => ({ get })),
    },
  };
});
