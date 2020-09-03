import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({
  title,
  backgroundColor,
  color,
  fontSize,
}) => {
  return (
    <TouchableOpacity>
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button;

const style={
  
}