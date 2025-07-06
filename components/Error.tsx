import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

export const Error: React.FC<ErrorProps> = ({ message, onRetry }) => {
  return (
    <View className="flex-1 items-center justify-center px-4">
      <Text className="mb-4 text-center text-lg text-red-500">{message}</Text>
      {onRetry && (
        <TouchableOpacity className="rounded-lg bg-blue-500 px-6 py-3" onPress={onRetry}>
          <Text className="font-semibold text-white">Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
