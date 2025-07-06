import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Movie, movieService } from '../services/movieService';
import { Ionicons } from '@expo/vector-icons';

interface MovieCardProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
  const posterUrl = movieService.getImageUrl(movie.poster_path, 'w500');
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <TouchableOpacity
      className="mx-4 mb-3 flex-row overflow-hidden rounded-lg bg-white shadow-sm"
      onPress={() => onPress(movie)}
      activeOpacity={0.7}>
      <View className="h-28 w-20 bg-gray-200">
        {posterUrl ? (
          <Image source={{ uri: posterUrl }} className="h-full w-full" resizeMode="cover" />
        ) : (
          <View className="h-full w-full items-center justify-center">
            <Ionicons name="image-outline" size={24} color="#9ca3af" />
          </View>
        )}
      </View>

      <View className="flex-1 p-3">
        <Text className="mb-1 text-lg font-semibold text-gray-900" numberOfLines={1}>
          {movie.title}
        </Text>
        <Text className="mb-2 text-sm text-gray-500">{year}</Text>
        <Text className="text-sm leading-5 text-gray-700" numberOfLines={3}>
          {movie.overview || 'No description available'}
        </Text>

        <View className="mt-2 flex-row items-center">
          <Ionicons name="star" size={16} color="#fbbf24" />
          <Text className="ml-1 text-sm text-gray-600">{movie.vote_average.toFixed(1)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
