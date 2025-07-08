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
    web: {
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
    },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      elevation: 12,
    },
  });

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return { bg: 'bg-emerald-500/20', text: 'text-emerald-700', icon: '#10b981' };
    if (rating >= 6) return { bg: 'bg-amber-500/20', text: 'text-amber-700', icon: '#f59e0b' };
    return { bg: 'bg-red-500/20', text: 'text-red-700', icon: '#ef4444' };
  };

  const ratingColors = getRatingColor(movie.vote_average);

  return (
    <TouchableOpacity
      className="mx-8 my-8 mb-12 overflow-hidden rounded-3xl border border-gray-200/50 bg-gradient-to-br from-white to-gray-50"
      style={cardShadow}
      onPress={() => onPress(movie)}
      activeOpacity={0.8}>
      {/* Header with backdrop gradient */}
      <View className="relative h-48 overflow-hidden">
        {posterUrl ? (
          <>
            <Image source={{ uri: posterUrl }} className="h-full w-full" resizeMode="cover" />
            {/* Multi-layered gradient overlay */}
            <View className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <View className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30" />
          </>
        ) : (
          <View className="h-full w-full items-center justify-center bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300">
            <Ionicons name="film-outline" size={48} color="#9ca3af" />
            <Text className="mt-2 text-sm font-medium text-gray-500">No Image</Text>
          </View>
        )}

        {/* Floating year badge */}
        <View className="absolute left-4 top-4">
          <View className="rounded-full bg-white/20 px-3 py-1 backdrop-blur-md">
            <Text className="text-sm font-bold text-white drop-shadow-sm">{year}</Text>
          </View>
        </View>

        {/* Rating badge - floating */}
        <View className="absolute right-4 top-4">
          <View
            className={`flex-row items-center rounded-full ${ratingColors.bg} px-3 py-1 backdrop-blur-md`}>
            <Ionicons name="star" size={16} color={ratingColors.icon} />
            <Text className={`ml-1 text-sm font-bold ${ratingColors.text}`}>
              {movie.vote_average.toFixed(1)}
            </Text>
          </View>
        </View>

        {/* Bottom gradient text overlay */}
        <View className="absolute bottom-0 left-0 right-0 p-4">
          <Text className="text-2xl font-bold text-white drop-shadow-lg" numberOfLines={2}>
            {movie.title}
          </Text>
          {movie.vote_count > 0 && (
            <Text className="mt-1 text-sm text-white/80">
              {movie.vote_count.toLocaleString()} votes
            </Text>
          )}
        </View>
      </View>

      {/* Content Section with enhanced styling */}
      <View className="p-6">
        {/* Genre or overview preview */}
        <View className="mb-4">
          <Text className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-400">
            Overview
          </Text>
          <Text className="text-base leading-relaxed text-gray-700" numberOfLines={3}>
            {movie.overview || 'No description available for this movie.'}
          </Text>
        </View>

        {/* Enhanced action section */}
        <View className="flex-row items-center justify-between rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
          <View className="flex-row items-center">
            <View className="rounded-full bg-blue-500/10 p-2">
              <Ionicons name="play-circle" size={20} color="#3b82f6" />
            </View>
            <View className="ml-3">
              <Text className="text-sm font-bold text-gray-900">Watch Now</Text>
              <Text className="text-xs text-gray-500">View movie details</Text>
            </View>
          </View>

          <View className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 p-2 shadow-lg">
            <Ionicons name="arrow-forward" size={20} color="white" />
          </View>
        </View>
      </View>

      {/* Decorative bottom border */}
      <View className="h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400" />
    </TouchableOpacity>
  );
};
