import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Upcoming from './Upcoming';
import Past from './Past';

const Tab = createMaterialTopTabNavigator();

const Reminders = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Upcoming" component={Upcoming} />
      <Tab.Screen name="Past" component={Past} />
    </Tab.Navigator>
  )
}

export default Reminders;