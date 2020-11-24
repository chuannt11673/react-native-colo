import React from 'react';
import { StyleSheet, Image } from 'react-native';

export default function FunnyLogo() {
    return (
        <Image source={require('@assets/images/Colo.png')} style={styles.logo} />
    )
}

const styles = StyleSheet.create({
    logo: {
        width: '100%',
        height: 200
    },
})
