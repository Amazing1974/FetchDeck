import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { Form, Spinner } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import { CommonActions } from '@react-navigation/native';
import { Palette, GlobalStyles } from '../styles';
import CustomInput from '../components/CustomInput';
import Button from '../components/Button';

const { width, height } = Dimensions.get('window');

const LoginScreen = (props) => {
  
  const toMain = () => {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Main',
          },
        ],
      })
    )
  }

  const onRegister = () => {
    console.log('asdfasdf');
  }

  const renderRegisterButton = () => {
    if (props.isLoading) { 
      return <Spinner color={Palette.red} />;
    }

    const { handleSubmit } = props;

    return (
      <View style={styles.buttonWrapper}>
        <Button
          title={'LOGIN'}
          onPress={handleSubmit(onRegister)}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.LoginContainer}>
        <Image
          source={require('../assets/images/splash.jpeg')}
          style={styles.image}
        />
        <Form style={GlobalStyles.form}>
          <Field
            name="email"
            component={CustomInput}
            floatLabel={'Email'}
            autoCorrect={false}
          />
          <Field
            name="password"
            component={CustomInput}
            floatLabel={'Password'}
            autoCorrect={false}
          />
          {renderRegisterButton()}
        </Form>
      </View>
    </SafeAreaView>
  )
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
const LoginForm = reduxForm({
  form: 'loginForm' // a unique identifier for this form
})(LoginScreen);

export default LoginForm;

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Palette.white,
  },
  LoginContainer: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    marginTop: -90,
    width: width - 180,
    height: height / 12,
    marginBottom: 20,
  },
  buttonWrapper: {
    marginTop: 60,
  }
}