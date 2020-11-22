import React from 'react';
import { StyleSheet, Text, TextProps, View } from 'react-native';

export default function FunnyText(props: TextProps) {
return <Text {...props} style={styles.text} />
}

const styles = StyleSheet.create({
    text: {
        
    }
})
