import React from 'react';
import { GestureResponderEvent, StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import colors from 'shared/consts/Colors';

interface FunnyButton2Props {
    icon?: boolean | React.ReactElement<{}>;
    title?: string;
    titleStyle?: StyleProp<TextStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
    onPress?: (event: GestureResponderEvent) => void;
}
export default function FunnyButton2(props: FunnyButton2Props) {
    return (
        <View style={[props.containerStyle,
            props.disabled ? {
                backgroundColor: '#d9d9d9'
            } : null
        ]}
        >
            <TouchableOpacity disabled={props.disabled} style={[{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
            }, props.buttonStyle]} onPress={props.onPress}>
                {
                    props.icon
                }
                <Text style={props.titleStyle}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
}
