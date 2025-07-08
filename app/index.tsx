import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { SearchInput } from '../components/SearchInput';
import { MovieCard } from '../components/MovieCard';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { Container } from '../components/Container';
import { movieService, Movie } from '../services/movieService';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['movies', searchQuery],
    queryFn: () => movieService.searchMovies(searchQuery),
    enabled: searchQuery.length > 0,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleMoviePress = (movie: Movie) => {
    router.push(`/movie/${movie.id}`);
  };

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <View className="flex w-full items-center justify-center">
      <View className="w-full max-w-md">
        <MovieCard movie={item} onPress={handleMoviePress} />
      </View>
    </View>
  );

  return (
    <Container>
      <React.Fragment>
        <Stack.Screen options={{ title: 'Movie Search' }} />
        <View className="mb-4">
          <SearchInput onSearch={handleSearch} isLoading={isLoading} />
        </View>

        {!searchQuery && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-xl text-gray-500">Search for movies above</Text>
          </View>
        )}

        {searchQuery && isLoading && <Loading message="Searching movies..." />}

        {searchQuery && error && (
          <Error message="Failed to search movies. Please try again." onRetry={refetch} />
        )}

        {searchQuery && data && (
          <FlatList
            data={data.results}
            renderItem={renderMovieItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-8"
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center">
                <Text className="text-lg text-gray-500">No movies found</Text>
              </View>
            }
          />
        )}
      </React.Fragment>
    </Container>
  );
}
