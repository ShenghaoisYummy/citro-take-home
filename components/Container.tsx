import React from 'react';
import { View } from 'react-native';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="m-6 flex-1">
      {React.Children.map(children, (child, index) => (React.isValidElement(child) ? child : null))}
    </View>
  );
};
