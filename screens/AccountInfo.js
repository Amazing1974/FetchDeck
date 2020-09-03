import React, { useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Palette, GlobalStyles } from '../styles'

const AccountInfo = ({navigation}) => {
  
  useEffect(() => {
    navigation.setOptions({
      title: 'My Account',
      headerRight: () => (
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.saveBtn}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} secureTextEntry={true} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Country</Text>
        <TextInput style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone</Text>
        <TextInput style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Time Zone</Text>
        <TextInput style={styles.input} />
      </View>
    </SafeAreaView>
  )
}

export default AccountInfo;

const styles = {
  container: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    ...GlobalStyles.darkLabel,
    width: '24%',
    textAlign: 'right',
    paddingRight: 12,
    fontSize: 16
  },
  input: {
    ...GlobalStyles.label,
    borderWidth: 1,
    borderColor: Palette.grey,
    width: '76%',
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontSize: 16
  },
  saveBtn: {
    ...GlobalStyles.label,
    color: Palette.purple,
    fontSize: 16,
    marginRight: 20,
  },
}