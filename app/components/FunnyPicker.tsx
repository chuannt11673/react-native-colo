import React from 'react';
import { Platform, View } from 'react-native';

import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';

import colors from '@shared/consts/Colors';

interface FunnyPickerProps extends PickerSelectProps {
}
export default function FunnyPicker(props: FunnyPickerProps) {
    return (
        <View style={{
            width: '100%',
            height: 40,
            justifyContent: 'center',
            padding: Platform.OS === 'ios' ? 6 : 0,
            borderWidth: 1,
            borderRadius: 12,
            borderColor: colors.border,
        }}>
            <RNPickerSelect
                {...props}
            />
        </View>
    )
}
