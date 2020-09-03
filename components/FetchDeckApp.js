import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SignupScreen from '../screens/SignupScreen';
import MainScreen from '../screens/MainScreen';
import Tutorial from '../screens/Tutorial';
import ProductDetail from '../screens/ProductDetail';
import AccountInfo from '../screens/AccountInfo';
import Reminders from '../screens/Reminders';
import DrawerContent from './DrawerContent';
import { Palette } from '../styles';

const FetchDeckApp = () => {
  
  const defaultOption = {
    headerStyle: { 
      backgroundColor: Palette.white,
    },
    headerBackTitleVisible: false,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontSize: 16,
      letterSpacing: 0.3
    },
    headerTintColor: Palette.black,
  }

  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const Main = () => {
    return (
      <Drawer.Navigator
        initialRouteName="Main"
        drawerContent={props => <DrawerContent {...props} />}
      >
        <Drawer.Screen name="Main" component={MainScreen} />
      </Drawer.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={defaultOption}
      >
        <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Main" component={Main} options={{headerShown: false}} />
        <Stack.Screen name="Tutorial" component={Tutorial} />
        <Stack.Screen name="AccountInfo" component={AccountInfo} />
        <Stack.Screen name="Reminders" component={Reminders} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default FetchDeckApp;