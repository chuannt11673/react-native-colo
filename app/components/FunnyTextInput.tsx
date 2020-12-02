import React, { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import colors from '@shared/consts/Colors';

interface FunnyTextInputProps extends TextInputProps {
    leftIcon?: any,
    rightIcon?: any,
    containerStyle?: any,
}

const FunnyTextInput = (props: FunnyTextInputProps) => {
    const inputRef = useRef<TextInput>(null);
    const [value, setValue] = useState('');

    const changeTextHandler = (val: string) => {
        setValue(val);
    }

    useEffect(() => {
        inputRef.current?.setNativeProps({
            value: value,
            style: {
                fontFamily: 'normal'
            }
        });
    }, [props.secureTextEntry]);
    return (
        <View style={[styles.container, props.containerStyle]}>
            <View style={styles.icon}>
                {
                    props.leftIcon
                }
            </View>
            <TextInput ref={inputRef} {...props} style={[styles.input, props.style]} value={value} onChangeText={changeTextHandler} />
            <View style={styles.icon}>
                {
                    props.rightIcon
                }
            </View>
        </View>
    )
}

export default FunnyTextInput;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 46,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: colors.black1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 8
    },
    input: {
        width: '80%',
        fontSize: RFValue(16),
        fontWeight: 'normal'
    },
    icon: {
        width: '10%'
    }
})

