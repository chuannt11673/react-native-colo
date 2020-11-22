import React from 'react';
import { View } from 'react-native';
import FunnyText from '@components/FunnyText';
import FunnyTextInput from '@components/FunnyTextInput';

import { AntDesign, Ionicons } from '@expo/vector-icons';

import styles from './LoginStyle';


export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <FunnyText style={styles.header}>Đăng nhập</FunnyText>
            <FunnyTextInput/>
        </View>
    )
}
