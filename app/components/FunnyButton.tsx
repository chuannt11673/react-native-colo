import React from 'react';
import { StyleSheet } from 'react-native';
import colors from '@shared/consts/Colors';
import { Button, ButtonProps } from 'react-native-elements';

interface FunnyButtonProps extends ButtonProps {
    title?: string;
};
export default function FunnyButton(props: FunnyButtonProps) {
    const defaultHandler = (e: any) => {
        if (props.onPress) {
            props.onPress(e);
        }
    }
    
    return (
        <Button
            containerStyle={props.containerStyle}
            buttonStyle={[styles.button, props.buttonStyle]}
            titleStyle={[styles.title, props.titleStyle]}
            title={props.title}
            icon={props.icon}
            {...props}
            onPress={
                defaultHandler
            }
        />
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.white,
    },
    title: {
        color: colors.black,
        fontSize: 17,
        marginLeft: 4
    }
})
