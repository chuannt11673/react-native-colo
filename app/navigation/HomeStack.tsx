import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import FunnyButton from '@components/FunnyButton';

import HomeTabs from '@screens/home/HomeTabs';
import ChatScreen from '@screens/chat/ChatScreen';

import AuthContext from '@shared/context/AuthContext';
import CommonConsts from '@shared/consts/CommonConstants';
import colors from '@shared/consts/Colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
import UserInfoResponseModel from 'shared/interfaces/UserInfoResponseModel';

import { FontAwesome } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

function DrawerContent() {
  const { signOut } = React.useContext(AuthContext);
  const [user, setUser] = useState('');

  const signOutHandler = async () => {
    await signOut();
  };

  useEffect(() => {
    AsyncStorage.getItem(CommonConsts.userInfoKey).then((res) => {
      if (res) {
        const userInfo: UserInfoResponseModel = JSON.parse(res);
        setUser(userInfo.name);
      }
    });
  });

  return (
    <View style={{
      flex: 1
    }}>
      <View style={{
        height: 88,
      }}>
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: 10
          }}
        >
            <FontAwesome name="user" size={24} color="white" />
            <Text style={{ marginLeft: 6, color: colors.white, fontSize: 16 }}>{user}</Text>
        </LinearGradient>
      </View>
      <FunnyButton
        title='Logout'
        containerStyle={styles.loginBtnContainer}
        buttonStyle={styles.logoutBtn}
        icon={
          <Ionicons name="ios-log-out" size={24} color="black" />
        }
        onPress={
          signOutHandler
        }
      />
    </View>
  )
};

export default function HomeStack() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name='Home' component={HomeTabs} options={{ headerShown: false }} />
      <Drawer.Screen name='Chat' component={ChatScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  loginBtnContainer: {
    borderRadius: 0,
  },
  logoutBtn: {
    backgroundColor: '#ccc',
    borderRadius: 0,
  }
});

