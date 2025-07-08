import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { movieService } from '../../services/movieService';
import { Loading } from '../../components/Loading';
import { Error } from '../../components/Error';
import { Container } from '../../components/Container';

const { width } = Dimensions.get('window');

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

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

  const headerButtonStyle = Platform.select({
    web: {
      backgroundColor: 'rgba(0,0,0,0.3)',
      backdropFilter: 'blur(8px)',
    },
    default: {
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
  });

  const posterShadow = Platform.select({
    web: { boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
  });

  const backdropOverlay = Platform.select({
    web: {
      background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
    },
    default: {
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
  });

  return (
    <Container>
      <Stack.Screen
        options={{
          title: '',
          headerTransparent: true,
          headerStyle: { backgroundColor: 'transparent' },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              className="rounded-full p-2"
              style={headerButtonStyle}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false} className="bg-gray-50">
        <View className="relative">
          {backdropUrl && (
            <Image source={{ uri: backdropUrl }} className="h-80 w-full" resizeMode="cover" />
          )}
          <View className="absolute inset-0" style={backdropOverlay} />

          <View className="absolute bottom-0 left-0 right-0 p-6">
            <View className="flex-row items-end">
              {posterUrl && (
                <View className="mr-4 rounded-xl" style={posterShadow}>
                  <Image
                    source={{ uri: posterUrl }}
                    className="h-48 w-32 rounded-xl border-2 border-white"
                    resizeMode="cover"
                  />
                </View>
              )}

              <View className="flex-1">
                <Text className="mb-2 text-2xl font-bold leading-tight text-white">
                  {movie.title}
                </Text>

                <View className="mb-2 flex-row items-center">
                  <View className="mr-3 flex-row items-center rounded-full bg-amber-500 px-3 py-1">
                    <Ionicons name="star" size={16} color="#fff" />
                    <Text className="ml-1 text-sm font-bold text-white">
                      {movie.vote_average.toFixed(1)}
                    </Text>
                  </View>
                  <Text className="text-sm text-gray-200">{movie.vote_count} votes</Text>
                </View>

                <View className="flex-row flex-wrap items-center">
                  <Text className="mr-4 text-sm text-gray-200">{year}</Text>
                  <Text className="mr-4 text-sm text-gray-200">{runtime}</Text>
                  <Text className="text-sm text-gray-200">
                    {movie.original_language.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="relative -mt-6 rounded-t-3xl bg-white">
          {movie.genres.length > 0 && (
            <View className="p-6 pb-4">
              <Text className="mb-3 text-lg font-bold text-gray-900">Genres</Text>
              <View className="flex-row flex-wrap">
                {movie.genres.map((genre) => (
                  <View key={genre.id} className="mb-2 mr-2 rounded-full bg-blue-100 px-4 py-2">
                    <Text className="text-sm font-medium text-blue-800">{genre.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View className="px-6 pb-6">
            <Text className="mb-3 text-lg font-bold text-gray-900">Overview</Text>
            <Text className="text-base leading-7 text-gray-700">
              {movie.overview || 'No overview available.'}
            </Text>
          </View>

          <View className="px-6 pb-8">
            <Text className="mb-4 text-lg font-bold text-gray-900">Details</Text>

            <View>
              <View className="flex-row items-center justify-between border-b border-gray-100 py-3">
                <Text className="text-sm font-medium text-gray-600">Release Date</Text>
                <Text className="text-sm text-gray-900">{movie.release_date || 'N/A'}</Text>
              </View>

              <View className="flex-row items-center justify-between border-b border-gray-100 py-3">
                <Text className="text-sm font-medium text-gray-600">Runtime</Text>
                <Text className="text-sm text-gray-900">{runtime}</Text>
              </View>

              <View className="flex-row items-center justify-between border-b border-gray-100 py-3">
                <Text className="text-sm font-medium text-gray-600">Language</Text>
                <Text className="text-sm text-gray-900">
                  {movie.original_language.toUpperCase()}
                </Text>
              </View>

              <View className="flex-row items-center justify-between py-3">
                <Text className="text-sm font-medium text-gray-600">Rating</Text>
                <View className="flex-row items-center">
                  <Ionicons name="star" size={16} color="#f59e0b" />
                  <Text className="ml-1 text-sm font-medium text-gray-900">
                    {movie.vote_average.toFixed(1)} / 10
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
