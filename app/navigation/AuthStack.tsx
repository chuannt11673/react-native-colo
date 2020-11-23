import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@screens/login/LoginScreen';
import RegisterScreen from 'screens/register/RegisterScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false, title: 'Đăng nhập' }} />
        <Stack.Screen name='Register' component={RegisterScreen} options={{ title: 'Đăng ký' }} />
    </Stack.Navigator>
  );
}
