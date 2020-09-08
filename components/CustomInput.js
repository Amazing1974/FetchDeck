import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Item, Input, Text, Icon, Label, View } from 'native-base';
import { Palette } from '../styles';

/**
 * to be wrapped with redux-form Field component
 */
export default function CustomInput(props) {
  const { input, itemStyle, inputStyle, floatLabel, ...inputProps } = props;
  const mergedInputStyle = { ...styles.input, ...inputStyle };

  return (
    <View style={styles.item}>
      <Text style={styles.label}>{floatLabel}</Text>
      <Input
        {...inputProps}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
        style={mergedInputStyle}
      />
    </View>
  );
}

const styles = {
  item: {
    marginLeft: 0,
    borderColor: Palette.white,
    flexDirection: 'column',
    alignSelf: 'stretch',
    height: 65,
    marginTop: 20,
  },
  label: {
    color: Palette.blue
  },
  input: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    borderWidth: 2,
    borderRadius: 6,
    borderColor: Palette.blue,
    color: Palette.black
  },
};
