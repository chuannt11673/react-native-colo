import React from 'react';
import { StyleProp, View, ViewStyle, Text } from 'react-native';

import { Picker, PickerIOS } from '@react-native-picker/picker';

import colors from '@shared/consts/Colors';

interface FunnyPickerItem {
    label: string;
    value: number | string;
}

interface FunnyPickerProps {
    item?: {
        firstItems: FunnyPickerItem[];
        secondItems: FunnyPickerItem[];
    };
    placeholder?: {
        first: string;
        second: string;
    };
    value?: { first: number | string; second: number | string };
    containerStyle?: StyleProp<ViewStyle>;
    onFirstValueChange?: (value: number | string) => void;
    onSecondValueChange?: (value: number | string) => void;
}

export default function FunnyMultiplePicker(props: FunnyPickerProps) {
    return (
        <View style={[
            {
                height: 46,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: colors.border,
                flexDirection: 'row',
                alignItems: 'center'
            },
            props.containerStyle
        ]}>
            <View style={{
                flex: 1
            }}>
                <Picker
                    style={{
                        backgroundColor: 'transparent',
                    }}
                    mode='dropdown'
                    selectedValue={props.value?.first}
                    onValueChange={
                        value => {
                            if (props.onFirstValueChange) {
                                props.onFirstValueChange(value);
                            }
                        }
                    }
                >
                    <Picker.Item label={props.placeholder?.first || 'Select an item...'} value='' color={colors.border} />
                    {
                        props.item ?
                            props.item.firstItems.map((item, index) => (
                                <Picker.Item key={index} label={item.label} value={item.value} />
                            ))
                            : null
                    }
                </Picker>
            </View>
            <Text>-</Text>
            <View style={{
                flex: 1
            }}>
                <Picker
                    style={{
                        backgroundColor: 'transparent',
                    }}
                    itemStyle={{
                        textAlign: 'center',
                    }}
                    mode='dropdown'
                    selectedValue={props.value?.second}
                    onValueChange={
                        value => {
                            if (props.onSecondValueChange) {
                                props.onSecondValueChange(value);
                            }
                        }
                    }
                >
                    <Picker.Item label={props.placeholder?.second || 'Select an item...'} value='' color={colors.border} />
                    {
                        props.item ?
                            props.item.secondItems.map((item, index) => (
                                <Picker.Item key={index} label={item.label} value={item.value} />
                            ))
                            : null
                    }
                </Picker>
            </View>
        </View>
    )
}
