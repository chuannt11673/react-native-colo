import React, { useState } from 'react';
import { Keyboard, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import FunnyText from '@components/FunnyText';
import FunnyTextInput from '@components/FunnyTextInput';
import FunnyLogo from '@components/FunnyLogo';

import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';

import styles from './LoginStyle';
import colors from '@shared/consts/Colors';
import { Button } from 'react-native-elements';
import AuthContext from '@shared/context/AuthContext';

export default function LoginScreen({ navigation }: any) {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [securePassword, setSecurePassword] = useState(true);
    const { signIn } = React.useContext(AuthContext);
    
    const registerHandler = () => {
        navigation.navigate('Register');
    };

    const usernameOnchange = (value: string) => {
        setUsername(value);
    }
    const passwordOnchange = (value: string) => {
        setPassword(value);
    }
    const signInHandler = () => {
        signIn(username, password);
    };
    
    return (
        <TouchableWithoutFeedback onPress={
            Keyboard.dismiss
        }>
            <SafeAreaView style={styles.container}>
                <FunnyLogo />
                <FunnyText style={styles.header}>Đăng nhập</FunnyText>
                <FunnyTextInput
                    containerStyle={{
                        width: '80%'
                    }}
                    placeholder='Email hoặc số điện thoại'
                    leftIcon={
                        <AntDesign name="user" size={24} color={colors.black1} />
                    }
                    onChangeText={
                        usernameOnchange
                    }
                />
                <FunnyTextInput
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
                        <Ionicons
                            name={
                                securePassword ? "ios-eye-off" : "ios-eye"
                            }
                            size={24}
                            color={colors.black1}
                            onPress={
                                () => setSecurePassword(!securePassword)
                            }
                        />
                    }
                    onChangeText={
                        passwordOnchange
                    }
                />
                <View style={styles.forgotPassword}>
                    <FunnyText style={styles.forgotPasswordText}>Quên mật khẩu</FunnyText>
                </View>
                <Button
                    containerStyle={styles.loginButtonContainer}
                    buttonStyle={styles.loginButton}
                    title='Đăng nhập'
                    onPress={
                        signInHandler
                    }
                />
                <FunnyText style={styles.otherLoginText}>Hoặc đăng nhập với...</FunnyText>
                <View style={styles.externalLogin}>
                    <Button
                        containerStyle={styles.externalLoginContainer}
                        buttonStyle={styles.externalLoginButton}
                        titleStyle={styles.externalLoginTitle}
                        title='Google'
                        icon={
                            <Ionicons name="logo-google" size={24} color="#db3236" />
                        }
                    />
                    <Button
                        containerStyle={styles.externalLoginContainer}
                        buttonStyle={styles.externalLoginButton}
                        titleStyle={styles.externalLoginTitle}
                        title='Facebook'
                        icon={
                            <FontAwesome name="facebook" size={24} color="#3b5998" />
                        }
                    />
                </View>
                <View style={styles.registerContainer}>
                    <FunnyText>Bạn chưa có tài khoản?</FunnyText>
                    <TouchableOpacity
                        style={{
                            marginLeft: 6
                        }}
                        onPress={
                            registerHandler
                        }
                    >
                        <FunnyText style={styles.registerButtonText}>Đăng ký</FunnyText>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
