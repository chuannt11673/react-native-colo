import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import FunnyButton from '@components/FunnyButton';

import HomeTabs from '@screens/home/HomeTabs';
import ChatScreen from '@screens/chat/ChatScreen';
import CreatePostScreen from '@screens/create-post/CreatePostScreen';

import AuthContext from '@shared/context/AuthContext';
import colors from '@shared/consts/Colors';

//  redux
import { connect } from 'react-redux';
import FunnyHeader from 'components/FunnyHeader';

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
      <FunnyButton
        title='Logout'
        containerStyle={styles.loginBtnContainer}
        buttonStyle={styles.logoutBtn}
        icon={
          <Ionicons name="ios-log-out" size={24} color="black" />
        }
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

