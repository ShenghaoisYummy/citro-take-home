import React from 'react';
import { View } from 'react-native';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <View
      style={{
        flex: 1,
        width: '33.333333%',
        alignSelf: 'center',
        marginVertical: 24,
      }}>
      {React.Children.map(children, (child, index) => (React.isValidElement(child) ? child : null))}
    </View>
  );
};
