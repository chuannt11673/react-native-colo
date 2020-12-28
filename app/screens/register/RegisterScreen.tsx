import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '@shared/consts/Colors';

// components
import FunnyText from '@components/FunnyText';
import FunnyTextInput from '@components/FunnyTextInput';
import FunnyLogo from '@components/FunnyLogo';
import FnButton from '@components/FunnyButton2';

import { AntDesign, Ionicons } from '@expo/vector-icons';

import styles from './RegisterStyle';

export default function RegisterScreen({ navigation }: any) {
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

    const registerHandler = () => {
        navigation.navigate('Confirmation');
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
                    <FunnyLogo />
                    <FunnyText style={styles.header}>Đăng ký tài khoản</FunnyText>
                    <FunnyTextInput
                        containerStyle={{
                            width: '80%'
                        }}
                        placeholder='Email hoặc số điện thoại'
                        leftIcon={
                            <AntDesign name="user" size={24} color={colors.border} />
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
                            <AntDesign name="lock" size={24} color={colors.border} />
                        }
                        rightIcon={
                            <Ionicons name={securePassword ? "ios-eye-off" : "ios-eye"} size={24} color={colors.border} onPress={() => setSecurePassword(!securePassword)} />
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
                            <AntDesign name="lock" size={24} color={colors.border} />
                        }
                        rightIcon={
                            isConfirmed ? <AntDesign name="checkcircle" size={24} color="#00e600" /> : null
                        }
                        onChangeText={
                            (value: string) => confirmPressHandler(value)
                        }
                    />
                    <FnButton
                        containerStyle={{
                            width: '80%',
                            height: 46,
                            marginTop: 20,
                            backgroundColor: colors.primary,
                            borderRadius: 14
                        }}
                        title='Đăng ký'
                        titleStyle={{
                            color: colors.white,
                            fontSize: 15
                        }}
                        onPress={
                            registerHandler
                        }
                    />
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
