import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '@shared/consts/Colors';
import { SimpleLineIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import MessageScreen from './tabs/message/MessageScreen';
import DiaryScreen from './tabs/diary/DiaryScreen';
import DatingScreen from './tabs/dating/DatingScreen';
import ProfileScreen from './tabs/profile/ProfileScreen';
import NotificationScreen from './tabs/notification/NotificationScreen';
import UpdateProfileScreen from '@screens/update-profile/UpdateProfileScreen';
import UploadProfileImagesScreen from '@screens/upload-profile-image/UploadProfileImagesScreen';

import { connect } from 'react-redux';

const Tab = createBottomTabNavigator();
const MessageNavigator = createStackNavigator();
const DiaryNavigator = createStackNavigator();
const DatingNavigator = createStackNavigator();
const ProfileNavigator = createStackNavigator();

const MessageStack = () => {
    return (
        <MessageNavigator.Navigator>
            <MessageNavigator.Screen
                name='Message'
                component={MessageScreen}
                options={{ headerShown: false }}
            />
        </MessageNavigator.Navigator>
    )
};
const DiaryStack = () => {
    return (
        <DiaryNavigator.Navigator>
            <DiaryNavigator.Screen
                name='Diary'
                component={DiaryScreen}
                options={{ headerShown: false }}
            />
        </DiaryNavigator.Navigator>
    )
};
const DatingStack = (props: any) => {
    return (
        <DatingNavigator.Navigator initialRouteName={
            props.profile ? 'Dating' : 'UpdateProfile'
        }>
            <DatingNavigator.Screen
                name='Dating'
                component={DatingScreen}
                options={{ headerShown: false }}
            />
            <DatingNavigator.Screen
                name='UpdateProfile'
                component={UpdateProfileScreen}
                options={{ headerShown: false }}
            />
            <DatingNavigator.Screen
                name='UploadProfileImages'
                component={UploadProfileImagesScreen}
                options={{ headerShown: false }}
            />
        </DatingNavigator.Navigator>
    )
};
const NotificationStack = () => {
    return (
        <DatingNavigator.Navigator>
            <DatingNavigator.Screen
                name='Notification'
                component={NotificationScreen}
                options={{ headerShown: false }}
            />
        </DatingNavigator.Navigator>
    )
};
const ProfileStack = () => {
    return (
        <ProfileNavigator.Navigator>
            <ProfileNavigator.Screen
                name='Profile'
                component={ProfileScreen}
                options={{ headerShown: false }}
            />
        </ProfileNavigator.Navigator>
    )
};

function HomeTabs(props: any) {
    return (
        <Tab.Navigator
            screenOptions={
                ({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        let iconName = '';
                        let color = focused ? colors.secondary : colors.black;
                        switch (route.name) {
                            case 'Message':
                                iconName = 'bubbles';
                                break;
                            case 'Diary':
                                iconName = 'home';
                                break;
                            case 'Dating':
                                iconName = 'heart';
                                break;
                            case 'Notification':
                                iconName = 'bell';
                                break;
                            case 'Profile':
                                iconName = 'user';
                        }
                        return <SimpleLineIcons name={iconName} size={24} color={color} />
                    }
                })
            }
        >
            <Tab.Screen
                name="Diary"
                component={DiaryStack}
                options={{
                    title: 'Trang chủ'
                }}
            />
            <Tab.Screen
                name="Message"
                component={MessageStack}
                options={{
                    title: 'Trò chuyện'
                }}
            />
            <Tab.Screen
                name="Dating"
                component={DatingStack}
                options={{
                    title: 'Hẹn hò'
                }}
                {...props}
            />
            <Tab.Screen
                name="Notification"
                component={NotificationStack}
                options={{
                    title: 'Thông báo'
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    title: 'Cá nhân'
                }}
            />
        </Tab.Navigator>
    )
};

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer.profile
    }
};

export default connect(mapStateToProps)(HomeTabs);
