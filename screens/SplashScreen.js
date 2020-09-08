import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  View,
  Dimensions,
} from 'react-native';
import { Palette } from '../styles';
import { Spinner } from 'native-base';
import { fetchRandomBidders } from '../actions';
import { CommonActions } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SplashScreen = (props) => {

  useEffect(() => {
    props.fetchRandomBidders();
    !props.isLoadingFetchProducts &&
    setTimeout(toAuth, 1000);
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

const mapStateToProps = state => ({
  isLoadingFetchProducts: state.products.isLoadingFetchProducts,
});

export default connect(mapStateToProps, {fetchRandomBidders})(SplashScreen);

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