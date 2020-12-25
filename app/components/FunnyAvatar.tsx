import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import colors from '@shared/consts/Colors';

interface FunnyAvatarProps {
    uri?: string;
    name?: string;
    content?: string;
};

export default function FunnyAvatar(props: FunnyAvatarProps) {
    return (
        <View style={itemStyles.item}>
            {
                props.uri ? (
                    <Image source={{ uri: props.uri }} style={itemStyles.avatar} />
                ) : null
            }
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
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 60,
        marginRight: 10
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.name
    },
    message: {
        fontSize: 14,
    },
})
