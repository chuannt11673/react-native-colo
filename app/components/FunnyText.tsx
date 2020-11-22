import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

export default class FunnyText extends React.Component<TextProps> {

    constructor(props: any) {
        super(props);
    }

    render(): any {
        return (
            <Text style={[styles.text, this.props.style]}>
                {this.props.children}
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    text: {

    }
})

