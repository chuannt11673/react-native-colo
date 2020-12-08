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
import * as WebBrowser from 'expo-web-browser';

export default function LoginScreen({ navigation }: any) {
    const { signIn, googleSignIn, facebookSignIn } = React.useContext(AuthContext);
    const signInHandler = () => {
        signIn(username, password, (err: string) => {
            setErrorMessage(err);
        });
    };

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [securePassword, setSecurePassword] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const ErrorMessage = () => {
        if (errorMessage) {
            return (
                <View style={styles.errorMessage}>
                    <FunnyText style={styles.error}>{errorMessage}</FunnyText>
                </View>
            )
        }
        return null;
    };

    React.useEffect(() => {
        WebBrowser.warmUpAsync();
        return () => {
            WebBrowser.coolDownAsync();
        }
    }, []);

    return (
        <TouchableWithoutFeedback onPress={
            Keyboard.dismiss
        }>
            <SafeAreaView style={styles.container}>
                <FunnyLogo />
                <FunnyText style={styles.header}>Đăng nhập</FunnyText>
                <FunnyTextInput
                    value={username}
                    containerStyle={{
                        width: '80%'
                    }}
                    placeholder='Email hoặc số điện thoại'
                    leftIcon={
                        <AntDesign name="user" size={24} color={colors.border} />
                    }
                    onChangeText={
                        (value: any) => setUsername(value)
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
                        <Ionicons
                            name={
                                securePassword ? "ios-eye-off" : "ios-eye"
                            }
                            size={24}
                            color={colors.border}
                            onPress={
                                () => setSecurePassword(!securePassword)
                            }
                        />
                    }
                    onChangeText={
                        (value: any) => setPassword(value)
                    }
                />
                <View style={styles.forgotPassword}>
                    <FunnyText style={styles.forgotPasswordText}>Quên mật khẩu</FunnyText>
                </View>
                <ErrorMessage />
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
                        onPress={
                            googleSignIn
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
                        onPress={
                            facebookSignIn
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
                            () => navigation.navigate('Register')
                        }
                    >
                        <FunnyText style={styles.registerButtonText}>Đăng ký</FunnyText>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
