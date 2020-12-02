import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '@shared/consts/Colors';
import { SimpleLineIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import MessageScreen from './tabs/message/MessageScreen';
import DiaryScreen from './tabs/diary/DiaryScreen';
import DatingScreen from './tabs/dating/DatingScreen';
import ProfileScreen from './tabs/profile/ProfileScreen';

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
const DatingStack = () => {
    return (
        <DatingNavigator.Navigator>
            <DatingNavigator.Screen
                name='Dating'
                component={DatingScreen}
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

export default function HomeTabs() {
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
                                iconName = 'globe';
                                break;
                            case 'Dating':
                                iconName = 'heart';
                                break;
                            case 'Profile':
                                iconName = 'user';
                        }
                        return <SimpleLineIcons name={iconName} size={21} color={color} />
                    }
                })
            }
        >
            <Tab.Screen
                name="Message"
                component={MessageStack}
            />
            <Tab.Screen
                name="Diary"
                component={DiaryStack}
            />
            <Tab.Screen
                name="Dating"
                component={DatingStack}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
            />
        </Tab.Navigator>
    )
}
