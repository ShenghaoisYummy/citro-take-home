import React from 'react';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { Movie, movieService } from '../services/movieService';
import { Ionicons } from '@expo/vector-icons';

interface MovieCardProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
  const posterUrl = movieService.getImageUrl(movie.poster_path, 'w500');
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  const cardShadow = Platform.select({
    web: { boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
  });

  return (
    <TouchableOpacity
      className="mx-4 mb-4 flex-row overflow-hidden rounded-xl border border-gray-200 bg-white"
      style={cardShadow}
      onPress={() => onPress(movie)}
      activeOpacity={0.8}>
      <View className="h-36 w-24 rounded-l-xl bg-gray-100">
        {posterUrl ? (
          <Image
            source={{ uri: posterUrl }}
            className="h-full w-full rounded-l-xl"
            resizeMode="cover"
          />
        ) : (
          <View className="h-full w-full items-center justify-center bg-gray-100">
            <Ionicons name="image-outline" size={28} color="#9ca3af" />
          </View>
        )}
      </View>

      <View className="flex-1 justify-between p-4">
        <View>
          <Text className="mb-1 text-xl font-bold leading-tight text-gray-900" numberOfLines={2}>
            {movie.title}
          </Text>
          <Text className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-500">
            {year}
          </Text>
          <Text className="mb-3 text-sm leading-5 text-gray-600" numberOfLines={3}>
            {movie.overview || 'No description available'}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center rounded-full bg-amber-50 px-2 py-1">
            <Ionicons name="star" size={16} color="#f59e0b" />
            <Text className="ml-1 text-sm font-semibold text-amber-700">
              {movie.vote_average.toFixed(1)}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="chevron-forward" size={16} color="#6b7280" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
