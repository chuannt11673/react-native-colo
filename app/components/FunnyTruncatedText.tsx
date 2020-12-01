import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '@shared/consts/Colors';

interface FunnyTruncatedTextProps {
    text: string;
}
export default function FunnyTruncatedText(props: FunnyTruncatedTextProps) {
    const maxLength = 150;
    const [truncatedText, setText] = useState(props.text);

    useEffect(() => {
        if (props.text.length > maxLength) {
            const tempText = props.text.slice(0, maxLength);
            setText(tempText + '... ');
        }
    }, []);

    const pressHandler = () => {
        setText(props.text);
    }

    const renderViewMoreButton = () => {
        if (truncatedText === props.text) {
            return null;
        }

        return (
            <>
                <Text style={styles.viewMore} onPress={ pressHandler }>Xem thêm</Text>
            </>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {truncatedText}
                {
                    renderViewMoreButton()
                }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
    },
    text: {
        color: colors.black,
        fontSize: 15,
        lineHeight: 19,
    },
    viewMore: {
        color: colors.secondary,
    },
})
