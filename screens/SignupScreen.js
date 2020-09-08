import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  SafeAreaView,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import { Form, Spinner } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import { CommonActions } from '@react-navigation/native';
import { Palette, GlobalStyles } from '../styles';
import { register } from '../actions';
import CustomInput from '../components/CustomInput';
import Button from '../components/Button';

const { width, height } = Dimensions.get('window');

const SignupScreen = (props) => {

  const onRegister = async (data) => {
    props.register({
      ...data,
      callback: () => props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Main',
            },
          ],
        })
      )
    });
  }

  const renderRegisterButton = () => {
    if (props.isLoading) { 
      return <Spinner color={Palette.green} />;
    }

    const { handleSubmit } = props;

    return (
      <View style={styles.buttonWrapper}>
        <Button
          title={'SIGNUP'}
          onPress={handleSubmit(onRegister)}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.signupContainer}>
        <Image
          source={require('../assets/images/splash.jpeg')}
          style={styles.image}
        />
        <Text style={GlobalStyles.errorMessage}>{props.auth.error}</Text>
        <Form style={GlobalStyles.form}>
          <Field
            name="fullName"
            component={CustomInput}
            floatLabel={'Full Name'}
            autoCorrect={false}
          />
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
          <Field
            name="confirmPassword"
            component={CustomInput}
            floatLabel={'Confirm Password'}
            autoCorrect={false}
            secureTextEntry
          />
          {renderRegisterButton()}
        </Form>
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  auth: state.auth,
});

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
const SignUpForm = reduxForm({
  form: 'signupForm' // a unique identifier for this form
})(SignupScreen);

export default connect(mapStateToProps, { register })(SignUpForm);

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Palette.white,
  },
  signupContainer: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    marginTop: -40,
    width: width - 180,
    height: height / 12,
  },
  buttonWrapper: {
    marginTop: 60,
  }
}