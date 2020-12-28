import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';


import HomeTabs from '@screens/home/HomeTabs';
import ChatScreen from '@screens/chat/ChatScreen';
import CreatePostScreen from '@screens/create-post/CreatePostScreen';

import AuthContext from '@shared/context/AuthContext';

// components
import FnButton from '@components/FunnyButton2';
import FunnyHeader from '@components/FunnyHeader';

//  redux
import { connect } from 'react-redux';

const Drawer = createDrawerNavigator();

function DrawerContent(props: any) {
  const { signOut } = React.useContext(AuthContext);

  useEffect(() => {
  }, []);

  return (
    <View style={{
      flex: 1
    }}>
      <FunnyHeader title='' leftComponent={(<View />)} rightComponent={(<View />)}/>
      <FnButton
        title='Logout'
        icon={
          <Ionicons name="ios-log-out" size={24} color="black" />
        }
        containerStyle={{
          height: 46,
          backgroundColor: '#ccc',
          borderRadius: 0,
        }}
        onPress={
          signOut
        }
      />
    </View>
  )
};

const mapStateToProps = (state: any) => {
  return {
    userInfo: state.authReducer
  }
};

const DrawerContentMapped = connect(mapStateToProps)(DrawerContent);

export default function HomeStack() {
  return (
    <Drawer.Navigator drawerContent={_ => <DrawerContentMapped />}>
      <Drawer.Screen name='Home' component={HomeTabs} options={{ headerShown: false }} />
      <Drawer.Screen name='Chat' component={ChatScreen} />
      <Drawer.Screen name='CreatePost' component={CreatePostScreen} />
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

