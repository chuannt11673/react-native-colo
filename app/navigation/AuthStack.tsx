import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@screens/login/LoginScreen';
import RegisterScreen from '@screens/register/RegisterScreen';
import ConfirmationScreen from '@screens/confirmation/ConfirmationScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false, title: 'Đăng nhập' }} />
        <Stack.Screen name='Register' component={RegisterScreen} options={{ title: 'Đăng ký' }} />
        <Stack.Screen name='Confirmation' component={ConfirmationScreen} options={{ title: 'Xác nhận' }} />
    </Stack.Navigator>
  );
}
