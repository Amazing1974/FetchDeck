import React, { useState } from 'react';
import { connect } from 'react-redux';
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
import { fetchProfile } from '../actions';
import auth from '@react-native-firebase/auth';
import CustomInput from '../components/CustomInput';
import Button from '../components/Button';

const { width, height } = Dimensions.get('window');

const LoginScreen = (props) => {

  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
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

  const onLogin = (data) => {
    setLoading(true);
    setErrorMessage('');
    const {email, password} = data;
    auth()
    .signInWithEmailAndPassword(email, password)
    .then(data => {
      props.fetchProfile(data.user.uid);
      toMain();
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        setErrorMessage('Invalid user!');
      }
      if (error.code === 'auth/invalid-email') {
        setErrorMessage('Invalid Email!');
      }
      if (error.code === 'auth/wrong-password') {
        setErrorMessage('Invalid Password!');
      }
      setLoading(false);
    });
  }

  const renderRegisterButton = () => {
    if (isLoading) { 
      return <Spinner color={Palette.green} />;
    }

    const { handleSubmit } = props;

    return (
      <View style={styles.buttonWrapper}>
        <Button
          title={'LOGIN'}
          onPress={handleSubmit(onLogin)}
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
        <Text style={GlobalStyles.errorMessage}>{errorMessage}</Text>
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
            secureTextEntry
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

export default connect(null, {fetchProfile})(LoginForm);

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
  },
  buttonWrapper: {
    marginTop: 60,
  }
}