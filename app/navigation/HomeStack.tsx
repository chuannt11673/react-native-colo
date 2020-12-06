import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeTabs from '@screens/home/HomeTabs';
import ChatScreen from 'screens/chat/ChatScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name='Chat' component={ChatScreen} />
    </Stack.Navigator>
  );
}
