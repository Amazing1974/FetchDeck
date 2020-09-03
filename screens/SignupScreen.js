import React from 'react';
import { Button, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { Palette, GlobalStyles } from '../styles';

const SignupScreen = ({
  navigation,
}) => {
  
  const toMain = () => {
    navigation.dispatch(
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.signupContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.boldTitle}>FETCH</Text>
          <Text style={styles.headerTitle}>DECK</Text>
        </View>
        <Text style={styles.description}>
          {'Deals on over 3 million items: Jewelry, smartwatches, drones and more.'}
        </Text>
        <View style={styles.buttonsContainer}>
          <View style={{marginBottom: 10}}>
            <Button
              title="Sign up with Apple"
              color={Palette.black}
              onPress={() => toMain()}
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Button
              title="Sign Up with Facebook"
              color={Palette.darkBlue}
              onPress={() => toMain()}
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Button
              title="Sign Up with Google"
              color={Palette.blue}
              onPress={() => toMain()}
            />
          </View>
          <View>
            <Button
              title="Sign Up with Email"
              color={Palette.green}
              onPress={() => toMain()}
            />
          </View>
        </View>
        <TouchableOpacity>
          <Text style={styles.alreadyAccount}>
            {'Aready have an account? Log in'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.privacy}>
        {'By signing up, you agree to our Terms of Use and Privacy Policy'}
      </Text>
    </SafeAreaView>
  )
}

export default SignupScreen;

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Palette.white,
  },
  signupContainer: {
    padding: 20,
    alignItems: 'center',
    height: '70%',
  },
  logoContainer: {
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 36,
    color: Palette.purple,
    letterSpacing: 0.5,
  },
  boldTitle: {
    fontSize: 36,
    color: Palette.purple,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  description: {
    ...GlobalStyles.label,
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonsContainer: {
    alignSelf: 'stretch',
    paddingVertical: 20,
  },
  privacy: {
    ...GlobalStyles.label,
    position: 'absolute',
    bottom: 60,
    left: 30,
    right: 30
  },
  alreadyAccount: {
    ...GlobalStyles.label,
    color: Palette.green,
  }
}