import React from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Palette, GlobalStyles } from '../styles';

const Past = () => {

  const card = () => {
    return (
      <View style={{
        width: '48%',
        margin: 4,
        backgroundColor: Palette.white
      }}>
        <View style={{width: '100%', height: 180, backgroundColor: Palette.grey}} />
        <View style={{padding: 8}}>
          <Text style={styles.price}>$ 25</Text>
          <Text style={styles.shipping}>$1 Shipping</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="star" size={20} color={Palette.orange} />
            <Text style={styles.marks}>2.4</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.conatiner}>
      <ScrollView>
        <View style={styles.cardContainer}>
          {card()}
          {card()}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Past;

const styles = {
  conatiner: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  price: {
    ...GlobalStyles.label,
    fontWeight: 'bold',
    fontSize: 18,
  },
  shipping: {
    ...GlobalStyles.darkLabel,
    fontSize: 18,
  },
  marks: {
    ...GlobalStyles.darkLabel,
    color: Palette.dark,
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 18,
  }
}