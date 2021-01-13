import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import colors from '@shared/consts/Colors';
import { Entypo } from '@expo/vector-icons';

interface FunnyAvatarProps {
    uri?: string;
    name?: string;
    action?: string;
    content?: string;
    localtion?: string;
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
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={itemStyles.name}>
                                {props.name}
                                
                            </Text>
                            <Text style={{
                                fontWeight: 'normal',
                                fontSize: 15,
                                marginLeft: 5,
                                opacity: 0.6
                            }}>
                                {props.action}
                            </Text>
                        </View>
                    ) : null
                }
                {
                    props.localtion ? (
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <Entypo name="location-pin" size={24} color={colors.blue} />
                            <Text>tại</Text>
                            <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>
                                {props.localtion}
                            </Text>
                        </View>
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
