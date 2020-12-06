import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import colors from '@shared/consts/Colors';

interface FunnyAvatarProps {
    uri?: string;
    name?: string;
    content?: string;
};
const defaultUri = require('@assets/images/default-avatar.jpg');
export default function FunnyAvatar(props: FunnyAvatarProps) {
    const [uri, setUri] = React.useState(defaultUri);
    React.useEffect(() => {
        if (props.uri) {
            setUri({ uri: props.uri });
        }
    }, []);

    return (
        <View style={itemStyles.item}>
            <Image source={uri} style={itemStyles.avatar} />
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
        fontWeight: '700',
        color: colors.name
    },
    message: {
        fontSize: 14,
    },
})
