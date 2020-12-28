import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

// components
import FunnyText from '@components/FunnyText';
import FunnyLogo from '@components/FunnyLogo';
import FnButton from '@components/FunnyButton2';

import styles from './ConfirmationStyle';

export default function ConfirmationScreen() {
    const [disableButton, setDisableButton] = React.useState(true);
    const firstRef = React.createRef<TextInput>();
    const secondRef = React.createRef<TextInput>();
    const thirdRef = React.createRef<TextInput>();
    const finalRef = React.createRef<TextInput>();

    const verifyCode = () => {
        finalRef.current?.blur();
        setDisableButton(false);
    };

    const focusNext = (ref: React.RefObject<TextInput>) => {
        ref.current?.focus();
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={
                Platform.OS === 'ios' ? 'padding' : 'height'
            }
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <FunnyText style={styles.header}>Nhập mã xác minh</FunnyText>
                    <FunnyLogo />
                    <FunnyText style={styles.description}>
                        Nhập mã xác minh mà chúng tôi gửi cho bạn trên điện thoại hoặc email
                    </FunnyText>
                    <View style={styles.inputs}>
                        <TextInput
                            keyboardType='numeric'
                            maxLength={1}
                            style={styles.input}
                            ref={firstRef}
                            onKeyPress={ (event) => {
                                if (event.nativeEvent.key !== 'Backspace') {
                                    focusNext(secondRef);
                                }
                            }}
                        />
                        <TextInput
                            keyboardType='numeric'
                            maxLength={1}
                            style={styles.input}
                            ref={secondRef}
                            onKeyPress={ (event) => {
                                if (event.nativeEvent.key !== 'Backspace') {
                                    focusNext(thirdRef);
                                } else {
                                    focusNext(firstRef);
                                }
                            }}
                        />
                        <TextInput
                            keyboardType='numeric'
                            maxLength={1}
                            style={styles.input}
                            ref={thirdRef}
                            onKeyPress={ (event) => {
                                if (event.nativeEvent.key !== 'Backspace') {
                                    focusNext(finalRef);
                                } else {
                                    focusNext(secondRef);
                                }
                            }}
                        />
                        <TextInput
                            keyboardType='numeric'
                            maxLength={1}
                            style={styles.input}
                            ref={finalRef}
                            onKeyPress={ (event) => {
                                if (event.nativeEvent.key !== 'Backspace') {
                                    verifyCode();
                                } else {
                                    focusNext(thirdRef);
                                }
                            }}
                        />
                    </View>
                    
                    <FnButton
                        containerStyle={styles.loginButtonContainer}
                        disabled={disableButton}
                        title='Tiếp theo'
                        titleStyle={styles.loginTitle}
                    />
                    <View style={styles.getCode}>
                        <FunnyText>
                            Nếu bạn không nhận được mã xác minh?
                        </FunnyText>
                        <TouchableOpacity style={styles.getCodeButton}>
                            <FunnyText style={styles.getCodeButtonText}>Gửi lại</FunnyText>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
