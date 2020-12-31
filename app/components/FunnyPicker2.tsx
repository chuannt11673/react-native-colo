import React from 'react';
import { StyleProp, View, ViewStyle, Platform } from 'react-native';

import { Picker, PickerIOS } from '@react-native-picker/picker';

import colors from '@shared/consts/Colors';

interface FunnyPickerProps {
    items?: { label: string; value: number | string }[];
    placeholder?: string;
    containerStyle?: StyleProp<ViewStyle>;
    value?: number | string;
    onValueChange?: (value: number | string) => void;
}
export default function FunnyPicker2(props: FunnyPickerProps) {
    return (
        <View style={[
            {
                height: 46,
                width: 100,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: colors.border,
                justifyContent: 'center'
            },
            props.containerStyle
        ]}>
            <Picker
                selectedValue={props.value}
                onValueChange={
                    value => {
                        if (props.onValueChange) {
                            props.onValueChange(value);
                        }
                    }
                }
            >
                <Picker.Item label={props.placeholder || 'Select an item...'} value='' color={colors.border}/>
                {
                    props.items ? props.items.map((item, index) => (
                        <Picker.Item key={index} label={item.label} value={item.value} />
                    )) : null
                }
            </Picker>
        </View>

    )
}


