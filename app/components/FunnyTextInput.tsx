import React from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, TextPropTypes, View, ViewPropTypes } from 'react-native';

interface FunnyTextInputProps extends TextInputProps {
    leftIcon: any;
    rightIcon: any;
}

export default class FunnyTextInput extends React.Component {
    static propTypes = {
        containerStyle: ViewPropTypes.style,
    }

    render(): any {
        return (
            <View style={[styles.container]}>
                <TextInput {...this.props} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
})
