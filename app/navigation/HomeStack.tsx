import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import FunnyButton from '@components/FunnyButton';

import HomeTabs from '@screens/home/HomeTabs';
import ChatScreen from '@screens/chat/ChatScreen';

import AuthContext from '@shared/context/AuthContext';

const Drawer = createDrawerNavigator();

function DrawerContent(props: any) {
  const { signOut } = React.useContext(AuthContext);

  const signOutHandler = async () => {
    await signOut();
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent: 'flex-end'
    }}>
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
    </SafeAreaView>
  )
};

export default function HomeStack() {
  return (
    <Drawer.Navigator drawerContent={ props => <DrawerContent {...props} /> }>
      <Drawer.Screen name='Home' component={HomeTabs} options={{ headerShown: false }} />
      <Drawer.Screen name='Chat' component={ChatScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  loginBtnContainer: {
    borderRadius: 0
  },
  logoutBtn: {
    backgroundColor: '#ccc',
    borderRadius: 0
  }
});

