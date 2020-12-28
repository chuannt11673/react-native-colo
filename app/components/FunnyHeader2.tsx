import React from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import colors from '@shared/consts/Colors';

interface FunnyHeader2Props {
    title?: string;
    disableLinearGradient?: boolean;
    leftComponent?: React.ReactElement<{}>;
    rightComponent?: React.ReactElement<{}>;
    titleStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
}
export default function FunnyHeader2(props: FunnyHeader2Props) {
    return (
        <View style={[{
            width: '100%',
            height: 90
        }, props.containerStyle]}>
            <LinearGradient
                colors={
                    props.disableLinearGradient ? [colors.white, colors.white] : [colors.primary, colors.secondary]
                }
                start={{
                    x: 0,
                    y: 0.5
                }}
                end={{
                    x: 1,
                    y: 0.5
                }}
                style={{ flex: 1 }}
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    padding: 10
                }}>
                    {
                        props.leftComponent ?? <View />
                    }
                    <Text style={[{ color: colors.white, fontSize: 17 }, props.titleStyle]}>{props.title}</Text>
                    {
                        props.rightComponent ?? <View />
                    }
                </View>

            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({})
