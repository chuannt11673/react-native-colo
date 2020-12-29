import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

import { Picker } from '@react-native-community/picker';

export default function FunnyPicker2() {
    return (
        <Picker style={{
            height: 50,
            width: 100
        }}>
            <Picker.Item label='Java' value='java' />
        </Picker>
    )
}

const styles = StyleSheet.create({})
