import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Palette } from '../styles';

const DrawerContent = ({navigation}) => {

  const drawerAction = (index) => {
    navigation.closeDrawer();
    switch(index) {
      case 0:
        return;
      case 1:
        navigation.navigate('Tutorial');
        return;
      case 2:
        navigation.navigate('AccountInfo');
        return;
      case 3:
        navigation.navigate('Reminders');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <Text style={styles.boldTitle}>FETCH</Text>
          <Text style={styles.headerTitle}>DECK</Text>
        </View>
        <TouchableOpacity
          style={styles.itemWrapper}
          onPress={() => drawerAction(0)}
        >
          <Icon name="home" size={18} color={Palette.dark}/>
          <Text style={styles.item}>Live Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemWrapper}
          onPress={() => drawerAction(1)}
        >
          <Icon name="questioncircleo" size={18} color={Palette.dark}/>
          <Text style={styles.item}>Tutorial</Text>
        </TouchableOpacity>
        <Text style={styles.title}>MY ACCOUNT</Text>
        <TouchableOpacity
          style={styles.itemWrapper}
          onPress={() => drawerAction(2)}
        >
          <Icon name="user" size={18} color={Palette.dark}/>
          <Text style={styles.item}>Account Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemWrapper}
          onPress={() => drawerAction(3)}
        >
          <Icon name="hearto" size={18} color={Palette.dark}/>
          <Text style={styles.item}>Reminders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemWrapper}
          onPress={() => {}}
        >
          <Icon name="hearto" size={18} color={Palette.dark}/>
          <Text style={styles.item}>FetchDeck Rewards</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemWrapper}
          onPress={() => {}}
        >
          <Icon name="bank" size={18} color={Palette.dark}/>
          <Text style={styles.item}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemWrapper}
          onPress={() => {}}
        >
          <Icon name="logout" size={18} color={Palette.dark}/>
          <Text style={styles.item}>Sign Out</Text>
        </TouchableOpacity>
        <Text style={styles.title}>PURCHASES</Text>
        <TouchableOpacity
          style={styles.itemWrapper}
          onPress={() => {}}
        >
          <Icon name="shoppingcart" size={18} color={Palette.dark}/>
          <Text style={styles.item}>My Orders</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DrawerContent;

const styles = {
  container: {
    flex: 1,
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    color: Palette.purple,
    letterSpacing: 0.5,
  },
  boldTitle: {
    fontSize: 24,
    color: Palette.purple,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  item: {
    fontSize: 18,
    color: Palette.dark,
    marginLeft: 10,
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems:'center',
    marginBottom: 10,
  }
}