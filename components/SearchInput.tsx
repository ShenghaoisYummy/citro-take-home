import React, { useState, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder = 'Search movies...',
  isLoading = false,
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  }, [query, onSearch]);

  const handleClear = useCallback(() => {
    setQuery('');
  }, []);

  const inputShadow = Platform.select({
    web: { boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
  });

  return (
    <View className="mx-4 mb-6">
      <View
        className="flex-row items-center rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4"
        style={inputShadow}>
        <Ionicons name="search" size={22} color="#6b7280" />
        <TextInput
          className="ml-4 flex-1 text-base font-medium text-gray-900"
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          editable={!isLoading}
        />
        {query.length > 0 && (
          <TouchableOpacity
            onPress={handleClear}
            className="ml-2 rounded-full bg-gray-200 p-1"
            activeOpacity={0.7}>
            <Ionicons name="close" size={16} color="#6b7280" />
          </TouchableOpacity>
        )}
      </View>
      {isLoading && (
        <View className="mt-2 flex-row items-center justify-center">
          <Text className="text-sm text-gray-500">Searching...</Text>
        </View>
      )}
    </View>
  );
};
