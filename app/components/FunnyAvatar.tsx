import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import colors from '@shared/consts/Colors';

interface FunnyAvatarProps {
    uri?: string;
    name?: string;
    content?: string;
}
export default function FunnyAvatar(props: FunnyAvatarProps) {
    return (
        <View style={itemStyles.item}>
            <Image source={{ uri: props.uri }} style={itemStyles.avatar} />
            <View>
                {
                    props.name ? (
                        <Text style={itemStyles.name}>
                            {props.name}
                        </Text>
                    ) : null
                }

                {
                    props.content ? (
                        <Text numberOfLines={1} style={itemStyles.message}>
                            {props.content}
                        </Text>
                    ) : null
                }

            </View>
        </View>
    )
}

const itemStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    item: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        margin: 10,
        width: 60,
        height: 60,
        borderRadius: 60,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.black
    },
    message: {
        fontSize: 14,
    },
})
