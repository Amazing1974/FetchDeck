import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { Palette, GlobalStyles } from '../styles';
import Button from '../components/Button';

const { width, height } = Dimensions.get('window');

const AuthScreen = (props) => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.signupContainer}>
        <Image
          source={require('../assets/images/splash.jpeg')}
          style={styles.image}
        />
        <Text style={styles.description}>
          {'Deals on over 3 million items: Jewelry, smartwatches, drones and more.'}
        </Text>
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title={'LOGIN'}
          onPress={() => props.navigation.navigate('Login')}
          style={{backgroundColor: Palette.blue}}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title={'SIGNUP'}
          onPress={() => props.navigation.navigate('Signup')}
        />
      </View>
      <Text style={styles.privacy}>
        {'By signing up, you agree to our Terms of Use and Privacy Policy'}
      </Text>
    </SafeAreaView>
  )
}

export default AuthScreen;

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
  description: {
    ...GlobalStyles.label,
    textAlign: 'center',
    marginVertical: 20,
  },
  privacy: {
    ...GlobalStyles.label,
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30
  },
  image: {
    marginTop: -50,
    width: width - 120,
    height: height / 10
  },
  buttonWrapper: {
    marginHorizontal: 20,
    marginBottom: 20
  }
}