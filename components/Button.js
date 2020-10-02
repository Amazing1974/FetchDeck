import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Palette } from '../styles';

const Button = (props) => {
  const { title, onPress, style, disabled } = props;
  const mergedButtonStyle = { ...styles.button, ...style };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={mergedButtonStyle}
    >
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button;

const styles = {
  button: {
    width: '100%',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: Palette.green,
  },
  label: {
    fontSize: 16,
    color: Palette.white,
    letterSpacing: 2,
    fontWeight: 'bold'
  }
}