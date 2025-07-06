import React, { useState, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// typescript interface for search input props
interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}
// search input component
export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder = 'Search movies...',
  isLoading = false,
}) => {
  // state for search query
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  }, [query, onSearch]);

  const handleClear = useCallback(() => {
    setQuery('');
  }, []);

  return (
    <View className="mx-4 mb-4">
      <View className="flex-row items-center rounded-lg bg-gray-100 px-4 py-3">
        <Ionicons name="search" size={20} color="#6b7280" />
        <TextInput
          className="ml-3 flex-1 text-base"
          placeholder={placeholder}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          editable={!isLoading}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <Ionicons name="close-circle" size={20} color="#6b7280" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
