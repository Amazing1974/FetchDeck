import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Form, Spinner } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import { Palette, GlobalStyles } from '../styles'
import CustomInput from '../components/CustomInput';

const AccountInfo = ({navigation, user}) => {
  
  useEffect(() => {
    navigation.setOptions({
      title: 'My Account',
      headerRight: () => (
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.saveBtn}>Save</Text>
        </TouchableOpacity>
      ),
    });

    console.log('====user', user);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Form style={GlobalStyles.form}>
        <Field
          name="name"
          component={CustomInput}
          floatLabel={'Name'}
          autoCorrect={false}
        />
        <Field
          name="email"
          component={CustomInput}
          floatLabel={'email'}
          autoCorrect={false}
        />
      </Form>
      {/* <View style={styles.inputContainer}>
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
      </View> */}
    </SafeAreaView>
  )
}

const mapStateProps = state => ({
  user: state.auth.user
})

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
const AccountInfoForm = reduxForm({
  form: 'accountInfoForm' // a unique identifier for this form
})(AccountInfo);

export default connect(mapStateProps)(AccountInfoForm);

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
    color: Palette.green,
    fontSize: 16,
    marginRight: 20,
  },
}