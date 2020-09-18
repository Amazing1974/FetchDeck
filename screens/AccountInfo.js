import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  View,
  SafeAreaView,
} from 'react-native';
import { Form, Spinner } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import { Palette, GlobalStyles } from '../styles'
import CustomInput from '../components/CustomInput';
import Button from '../components/Button';

const AccountInfo = (props) => {
  
  useEffect(() => {
    props.navigation.setOptions({
      title: 'My Account'
    });

    props.initialize({
      first_name: props.user.first_name,
      last_name: props.user.last_name,
      email: props.user.email
    });
  }, []);

  const renderManageShippingAddressBtn = () => {
    return(
      <View style={{marginTop: 40}}>
        <Button
          title={'Manage Shipping Address'}
          onPress={() => props.navigation.navigate('ShippingAddress')}
          style={{backgroundColor: Palette.blue}}
        />
      </View>
    )
  } 

  return (
    <SafeAreaView style={styles.container}>
      <Form style={GlobalStyles.form}>
        <Field
          name="first_name"
          component={CustomInput}
          floatLabel={'First Name'}
          autoCorrect={false}
        />
        <Field
          name="last_name"
          component={CustomInput}
          floatLabel={'Last Name'}
          autoCorrect={false}
        />
        <Field
          name="email"
          component={CustomInput}
          floatLabel={'Email'}
          autoCorrect={false}
        />
      </Form>
      {renderManageShippingAddressBtn()}
    </SafeAreaView>
  )
}

const mapStateProps = state => ({
  isLoading: state.auth.isLoading,
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