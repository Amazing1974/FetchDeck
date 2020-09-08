import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  View,
  Dimensions,
} from 'react-native';
import { Palette } from '../styles';
import { Spinner } from 'native-base';
import { fetchRandomBidders, fetchProfile } from '../actions';
import { CommonActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const { width, height } = Dimensions.get('window');

const SplashScreen = (props) => {

  useEffect(() => {
    let authFlag = true;
    
    props.fetchRandomBidders();
    auth().onAuthStateChanged(user => {
      if(authFlag) {
        user ? toMain(user.uid) : toAuth()
        authFlag = false;
      }
    })
  }, []);

  const toAuth = () => {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Auth',
          },
        ],
      })
    )
  }

  const toMain = (id) => {
    props.fetchProfile(id);
    
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
  
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash.jpeg')}
        style={styles.image}
      />
      {
        props.isLoadingFetchProducts && (
          <Spinner color={Palette.blue} style={{height: 47}} />
        )
      }
    </View>
  )
}

export default connect(null, {fetchRandomBidders, fetchProfile})(SplashScreen);

const styles = {
  container: {
    flex: 1,
    backgroundColor: Palette.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100
  },
  image: {
    width: width - 20,
    height: height / 3
  }
}