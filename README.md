# Movie Search App 🎬

## This project is part of a take-home coding challenge.

A modern, cross-platform movie search application built with **React Native (Expo)** and **TypeScript**. Search for movies, view detailed information, and discover your next favorite film with a beautiful, responsive interface.

## ✨ Features

### 🔍 **Movie Search**

- Real-time movie search powered by **The Movie Database (TMDB) API**
- Responsive search input with loading states
- Comprehensive search results with movie metadata

### 🎭 **Movie Details**

- **Detailed movie information** including:
  - High-quality posters and backdrop images
  - Release date, runtime, and language
  - User ratings and vote counts
  - Genre tags and comprehensive overview
  - Production details

## 🛠️ Tech Stack

### **Frontend**

- **React Native** (0.79.3) with **Expo** (~53.0.11)
- **TypeScript** (~5.8.3)
- **Expo Router** (~5.1.0) for navigation
- **NativeWind** (latest) for styling
- **React Native Reanimated** (~3.17.4) for animations

### **State Management & Data**

- **TanStack React Query** (^5.81.5) for server state management
- **Axios** (^1.10.0) for HTTP requests
- **TMDB API** integration for movie data

### **Testing**

- **Jest** (^30.0.4) with **React Native Testing Library**
- **Jest Expo** preset for seamless testing
- **@testing-library/jest-native** for enhanced assertions
- **100% test coverage** for components and services

### **Development Tools**

- **ESLint** + **Prettier** for code formatting
- **React Native Dotenv** for environment variables
- **TypeScript** definitions for all components

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **TMDB API Key** (get one at [themoviedb.org](https://www.themoviedb.org/))

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd yourfolder/citro-take-home
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory:

   ```env
   TMDB_ACCESS_TOKEN=your_tmdb_access_token_here
   ```

4. **Start the development server**:

   ```bash
   npm start
   ```

5. **Run on different platforms**:

   ```bash
   # Web
   npm run web

   # iOS
   npm run ios

   # Android
   npm run android
   ```

## 🧪 Testing

The project includes comprehensive Jest tests with full coverage:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

**Test Coverage:**

- ✅ **Components**: MovieCard, SearchInput, Loading, Error, Container
- ✅ **Services**: Movie API service with complete functionality
- ✅ **Utilities**: Image URL generation, date formatting, error handling

## 📁 Project Structure

```
eng-take-home/
├── app/                    # App screens (Expo Router)
│   ├── _layout.tsx        # Root layout with providers
│   ├── index.tsx          # Home screen with search
│   └── movie/[id].tsx     # Movie details screen
├── components/            # Reusable UI components
│   ├── Container.tsx      # Layout container
│   ├── Error.tsx          # Error display component
│   ├── Loading.tsx        # Loading indicator
│   ├── MovieCard.tsx      # Movie card component
│   └── SearchInput.tsx    # Search input component
├── services/              # API services
│   └── movieService.ts    # TMDB API integration
├── config/                # Configuration files
│   └── api.ts             # API configuration
├── __tests__/             # Test files
│   ├── components/        # Component tests
│   └── services/          # Service tests
├── __mocks__/             # Jest mocks
└── assets/                # Static assets
```

## 🔧 Development Commands

```bash
# Development
npm start              # Start Expo development server
npm run ios            # Run on iOS simulator
npm run android        # Run on Android emulator
npm run web            # Run on web browser

# Code Quality
npm run lint           # Run ESLint
npm run format         # Format code with Prettier

# Testing
npm test               # Run Jest tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Generate coverage report

# Build
npm run prebuild       # Prepare for native build
```

## 🚀 Possible Improvements

### 🏃‍♂️ Performance Optimizations

- **Image Optimization**:

  - Implement lazy loading for movie posters
  - Add image caching with `react-native-fast-image` or `expo-image`
  - Implement progressive image loading (blur-to-sharp transition)
  - Use WebP format for better compression

- **Data & Network**:

  - Implement pagination with infinite scroll for search results
  - Add debouncing to search input (currently missing)
  - Implement request caching and offline support
  - Add data prefetching for popular/trending movies

- **Rendering Performance**:
  - Use `FlatList` instead of `ScrollView` for large movie lists
  - Implement `getItemLayout` for consistent item heights
  - Add `React.memo` for expensive components
  - Use `useMemo` and `useCallback` for expensive calculations

### 🔒 Security Enhancements

- **API Security**:

  - Move API tokens to secure storage (Keychain/Keystore)
  - Implement API request signing
  - Add rate limiting and request throttling
  - Use environment-specific API endpoints

- **Data Protection**:
  - Implement certificate pinning for HTTPS requests
  - Add request/response encryption for sensitive data
  - Sanitize user input to prevent XSS attacks
  - Implement proper error handling without exposing sensitive info

### ♿ Accessibility Improvements

- **Screen Reader Support**:

  - Add comprehensive `accessibilityLabel` and `accessibilityHint` props
  - Implement proper heading hierarchy with `accessibilityRole`
  - Add `accessibilityState` for dynamic content states
  - Ensure all interactive elements are focusable

- **Visual Accessibility**:

  - Support system font scaling (Dynamic Type)
  - Implement high contrast mode support
  - Add focus indicators for keyboard navigation
  - Ensure minimum color contrast ratios (WCAG 2.1 AA)

- **Motor Accessibility**:
  - Increase touch target sizes (minimum 44x44 points)
  - Add keyboard navigation support
  - Implement voice control compatibility
  - Support switch control for users with motor disabilities

### 📱 User Experience Enhancements

- **State Management**:

  - Add proper loading states for all async operations
  - Implement optimistic updates for better perceived performance
  - Add retry mechanisms for failed requests
  - Implement proper error boundaries with recovery options

- **Offline Experience**:

  - Cache frequently accessed movie data
  - Implement offline-first architecture
  - Add network status indicators
  - Provide graceful degradation when offline

- **Personalization**:
  - Add user preferences and settings
  - Implement dark/light theme support
  - Add favorite movies functionality
  - Implement viewing history and recommendations

### 🧪 Testing & Quality

- **Testing Coverage**:

  - Add E2E tests with Detox or Maestro
  - Implement visual regression testing
  - Add performance monitoring and profiling
  - Test accessibility with screen readers

- **Code Quality**:
  - Implement Husky pre-commit hooks
  - Add SonarQube for code quality analysis
  - Implement automated dependency updates
  - Add comprehensive logging and monitoring

### 🏗️ Architecture Improvements

- **Scalability**:

  - Implement micro-frontends architecture
  - Add feature flag management
  - Implement proper error tracking (Sentry, Bugsnag)
  - Add analytics and user behavior tracking

- **Developer Experience**:
  - Add Storybook for component development
  - Implement automated deployment pipelines
  - Add proper development/staging/production environments
  - Implement code generation for repetitive tasks

---

**Built with ❤️ using React Native, Expo, and TypeScript**
