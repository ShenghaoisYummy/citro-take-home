import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchInput } from '../../components/SearchInput';

// Mock expo vector icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

describe('SearchInput Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders correctly with default props', () => {
    const { getByText } = render(<SearchInput onSearch={mockOnSearch} />);

    expect(getByText('Search Movies')).toBeTruthy();
    expect(getByText('Discover amazing movies')).toBeTruthy();
  });

  it('shows loading state when isLoading is true', () => {
    const { getByText } = render(<SearchInput onSearch={mockOnSearch} isLoading={true} />);

    expect(getByText('Searching...')).toBeTruthy();
    expect(getByText('Finding movies...')).toBeTruthy();
  });

  it('expands to show input field when button is pressed', () => {
    const { getByText, getByPlaceholderText } = render(
      <SearchInput onSearch={mockOnSearch} placeholder="Search movies..." />
    );

    const searchButton = getByText('Search Movies');
    fireEvent.press(searchButton);

    expect(getByPlaceholderText('Search movies...')).toBeTruthy();
  });

  it('calls onSearch when search is triggered with valid input', () => {
    const { getByText, getByPlaceholderText } = render(<SearchInput onSearch={mockOnSearch} />);

    // Expand the input
    const searchButton = getByText('Search Movies');
    fireEvent.press(searchButton);

    // Enter text
    const textInput = getByPlaceholderText('Search movies...');
    fireEvent.changeText(textInput, 'Avengers');

    // Submit the form
    fireEvent(textInput, 'submitEditing');

    expect(mockOnSearch).toHaveBeenCalledWith('Avengers');
  });

  it('does not call onSearch when input is empty', () => {
    const { getByText, getByPlaceholderText } = render(<SearchInput onSearch={mockOnSearch} />);

    // Expand the input
    const searchButton = getByText('Search Movies');
    fireEvent.press(searchButton);

    // Enter empty text
    const textInput = getByPlaceholderText('Search movies...');
    fireEvent.changeText(textInput, '');

    // Submit the form
    fireEvent(textInput, 'submitEditing');

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('shows last search query when collapsed', () => {
    const { getByText, getByPlaceholderText } = render(<SearchInput onSearch={mockOnSearch} />);

    // Expand the input
    const searchButton = getByText('Search Movies');
    fireEvent.press(searchButton);

    // Enter text and search
    const textInput = getByPlaceholderText('Search movies...');
    fireEvent.changeText(textInput, 'Spider-Man');
    fireEvent(textInput, 'submitEditing');

    // Check if last search is shown
    expect(getByText('Last: "Spider-Man"')).toBeTruthy();
  });

  it('trims whitespace from search query', () => {
    const { getByText, getByPlaceholderText } = render(<SearchInput onSearch={mockOnSearch} />);

    // Expand the input
    const searchButton = getByText('Search Movies');
    fireEvent.press(searchButton);

    // Enter text with whitespace
    const textInput = getByPlaceholderText('Search movies...');
    fireEvent.changeText(textInput, '  The Matrix  ');

    // Submit the form
    fireEvent(textInput, 'submitEditing');

    expect(mockOnSearch).toHaveBeenCalledWith('The Matrix');
  });
});
