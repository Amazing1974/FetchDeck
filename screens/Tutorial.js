import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Palette, GlobalStyles } from '../styles';

const Tutorial = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.main}>
          {/** How It Works */}
          <Text style={styles.title}>How It Works</Text>
          <Text style={styles.subTitle}>Bids are FREE, Pay if you WIN!</Text>
          <Text>Each bid extends the auction time by 10 sections.</Text>
          <Icon name="clock" size={30} color={Palette.black} style={{marginTop: 20}}/>
          <View style={styles.splitBar} />

          {/** Secure Payments */}
          <Text style={styles.title}>Secure Payments</Text>
          <Text style={styles.subTitle}>128-bit SSL encryption</Text>
          <Image
            source={require('../assets/images/payMethod.png')}
            style={{width: 350, resizeMode: 'contain', marginTop: -20}}
          />
          <View style={styles.splitBar} />

          {/** Easy Returns */}
          <Text style={styles.title}>Easy Returns</Text>
          <Text style={styles.context}>We want you to be completely satisfied with your purchase on FetchDeck. If you are not satisfied, you may return any item within 30 dyas of delivery</Text>
          <View style={styles.splitBar} />

          {/** Auction Reminders */}
          <Text style={styles.title}>Auction Reminders</Text>
          <Text style={styles.context}>Don't miss out on a great deal!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Tutorial;

const styles = {
  container: {
    flex: 1,
    backgroundColor: Palette.white,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    ...GlobalStyles.label,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subTitle: {
    ...GlobalStyles.darkLabel,
    fontSize: 18,
    marginVertical: 20,
  },
  context: {
    ...GlobalStyles.label,
    marginTop: 20,
    lineHeight: 20,
    textAlign: 'center'
  },
  splitBar: {
    width: '90%',
    height: 1,
    backgroundColor: Palette.overlay,
    marginVertical: 20
  },
}