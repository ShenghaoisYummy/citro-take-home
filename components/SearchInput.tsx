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
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      onSearch(query.trim());
      setIsExpanded(false);
    }
  }, [query, onSearch]);

  const handleButtonPress = useCallback(() => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else if (query.trim()) {
      handleSearch();
    }
  }, [isExpanded, query, handleSearch]);

  const handleClear = useCallback(() => {
    setQuery('');
    setIsExpanded(false);
  }, []);

  const buttonShadow = Platform.select({
    web: {
      boxShadow:
        '0 10px 25px -5px rgba(59, 130, 246, 0.5), 0 8px 10px -6px rgba(59, 130, 246, 0.1)',
      transition: 'all 0.3s ease',
    },
    default: {
      shadowColor: '#3b82f6',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
    },
  });

  return (
    <View className="mx-auto mb-8 w-full max-w-lg px-4">
      <TouchableOpacity
        onPress={handleButtonPress}
        disabled={isLoading}
        className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 p-1"
        style={buttonShadow}
        activeOpacity={0.8}>
        {/* Inner button content */}
        <View className="flex-row items-center justify-center rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-500 px-8 py-4">
          {/* Search icon */}
          <View className="mr-4 rounded-full bg-black/20 p-3 backdrop-blur-sm">
            <Ionicons name={isLoading ? 'hourglass' : 'search'} size={24} color="black" />
          </View>

          {/* Input or Button text */}
          {isExpanded ? (
            <View className="flex-1 flex-row items-center">
              <TextInput
                className="flex-1 text-lg font-medium text-black placeholder-black/70"
                placeholder={placeholder}
                placeholderTextColor="black"
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
                editable={!isLoading}
                autoFocus={true}
                style={{ color: 'black' }}
              />
              {query.length > 0 && (
                <TouchableOpacity
                  onPress={handleClear}
                  className="ml-2 rounded-full bg-black/20 p-1"
                  activeOpacity={0.7}>
                  <Ionicons name="close" size={16} color="black" />
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View className="flex-1">
              <Text className="text-center text-lg font-bold text-black">
                {isLoading ? 'Searching...' : 'Search Movies'}
              </Text>
              <Text className="text-center text-sm text-black/80">
                {query ? `Last: "${query}"` : 'Discover amazing movies'}
              </Text>
            </View>
          )}

          {/* Arrow icon */}
          <View className="ml-4 rounded-full bg-black/20 p-2">
            <Ionicons name={isExpanded ? 'checkmark' : 'arrow-forward'} size={20} color="black" />
          </View>
        </View>

        {/* Decorative bottom border */}
        <View className="h-1 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400" />
      </TouchableOpacity>

      {/* Loading indicator */}
      {isLoading && (
        <View className="mt-4 flex-row items-center justify-center">
          <View className="mr-2 h-2 w-2 animate-pulse rounded-full bg-blue-500" />
          <Text className="text-sm font-medium text-gray-600">Finding movies...</Text>
        </View>
      )}
    </View>
  );
};
