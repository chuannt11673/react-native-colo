import FunnyText from '@components/FunnyText';
import FunnyTextInput from '@components/FunnyTextInput';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StatusBar, TouchableWithoutFeedback, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '@shared/consts/Colors';

import styles from './RegisterStyle';
import { Button } from 'react-native-elements';

export default function RegisterScreen() {
    const [securePassword, setSecurePassword] = React.useState(true);
    const [isConfirmed, setIsConfirmed] = React.useState(false);

    const [password, setPassword] = React.useState('');

    const confirmPressHandler = (value: string) => {
        if (value === password) {
            setIsConfirmed(true);
        } else {
            setIsConfirmed(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={80}
            style={{
                flex: 1
            }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.logo}>
                        <FunnyText style={styles.logoText}>Colo</FunnyText>
                    </View>
                    <FunnyText style={styles.header}>Đăng ký tài khoản</FunnyText>
                    <FunnyTextInput
                        containerStyle={{
                            width: '80%'
                        }}
                        placeholder='Email hoặc số điện thoại'
                        leftIcon={
                            <AntDesign name="user" size={24} color={colors.black1} />
                        }
                    />
                    <FunnyTextInput
                        value={password}
                        containerStyle={{
                            width: '80%',
                            marginTop: 10
                        }}
                        placeholder='Mật khẩu'
                        secureTextEntry={
                            securePassword
                        }
                        leftIcon={
                            <AntDesign name="lock" size={24} color={colors.black1} />
                        }
                        rightIcon={
                            <Ionicons name={securePassword ? "ios-eye-off" : "ios-eye"} size={24} color={colors.black1} onPress={() => setSecurePassword(!securePassword)} />
                        }
                        onChangeText={
                            (value: string) => setPassword(value)
                        }
                    />
                    <FunnyTextInput
                        containerStyle={{
                            width: '80%',
                            marginTop: 10
                        }}
                        placeholder='Nhập lại mật khẩu'
                        secureTextEntry={true}
                        leftIcon={
                            <AntDesign name="lock" size={24} color={colors.black1} />
                        }
                        rightIcon={
                            isConfirmed ? <AntDesign name="checkcircle" size={24} color="#00e600" /> : null
                        }
                        onChangeText={
                            (value: string) => confirmPressHandler(value)
                        }
                    />
                    <Button
                        containerStyle={styles.loginButtonContainer}
                        buttonStyle={styles.loginButton}
                        title='Đăng ký'
                    />
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
