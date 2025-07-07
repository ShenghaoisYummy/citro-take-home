import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { movieService } from '../../services/movieService';
import { Loading } from '../../components/Loading';
import { Error } from '../../components/Error';
import { Container } from '../../components/Container';

export default function MovieDetailsScreen() {
  // get the id from the url
  const { id } = useLocalSearchParams<{ id: string }>();

  // use the router to navigate back
  const router = useRouter();

  // use the useQuery hook to get the movie details
  const {
    data: movie,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => movieService.getMovieDetails(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return <Loading message="Loading movie details..." />;
  }

  if (error) {
    return <Error message="Failed to load movie details. Please try again." onRetry={refetch} />;
  }

  if (!movie) {
    return <Error message="Movie not found." />;
  }

  const posterUrl = movieService.getImageUrl(movie.poster_path, 'w500');
  const backdropUrl = movieService.getImageUrl(movie.backdrop_path, 'w1280');
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const runtime = movie.runtime ? `${movie.runtime} min` : 'N/A';

  return (
    <Container>
      <Stack.Screen
        options={{
          title: movie.title,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {backdropUrl && (
          <Image source={{ uri: backdropUrl }} className="h-64 w-full" resizeMode="cover" />
        )}

        <View className="p-4">
          <View className="mb-4 flex-row">
            {posterUrl && (
              <Image
                source={{ uri: posterUrl }}
                className="mr-4 h-48 w-32 rounded-lg"
                resizeMode="cover"
              />
            )}

            <View className="flex-1">
              <Text className="mb-2 text-2xl font-bold text-gray-900">{movie.title}</Text>

              <View className="mb-2 flex-row items-center">
                <Ionicons name="star" size={16} color="#fbbf24" />
                <Text className="ml-1 text-sm text-gray-600">
                  {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
                </Text>
              </View>

              <Text className="mb-1 text-sm text-gray-600">
                <Text className="font-semibold">Year:</Text> {year}
              </Text>

              <Text className="mb-1 text-sm text-gray-600">
                <Text className="font-semibold">Runtime:</Text> {runtime}
              </Text>

              <Text className="mb-1 text-sm text-gray-600">
                <Text className="font-semibold">Language:</Text>{' '}
                {movie.original_language.toUpperCase()}
              </Text>

              {movie.genres.length > 0 && (
                <View className="mt-2 flex-row flex-wrap">
                  {movie.genres.map((genre) => (
                    <View key={genre.id} className="mb-2 mr-2 rounded-full bg-blue-100 px-3 py-1">
                      <Text className="text-xs text-blue-800">{genre.name}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>

          <View className="mb-4">
            <Text className="mb-2 text-lg font-semibold text-gray-900">Overview</Text>
            <Text className="leading-6 text-gray-700">
              {movie.overview || 'No overview available.'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
