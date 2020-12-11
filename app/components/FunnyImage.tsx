import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Image } from 'react-native';
import colors from '@shared/consts/Colors';
import AxiosClient from 'shared/Axios';

const windowWidth = Dimensions.get('window').width;
interface FunnyImageProps {
    uri: string;
    width?: number;
    containerStyle?: any;
}
export default function FunnyImage(props: FunnyImageProps) {
    const [inStyle, setStyle] = useState<any>();
    const width =  props.width || windowWidth;
    
    useEffect(() => {
        Image.getSize(`${AxiosClient.defaults.baseURL}${props.uri}`, (w, h) => {
            const ratio = width / w;
            setStyle({
                width: width,
                height: h * ratio
            })
        })
    }, [])

    return (
        <Image
                style={[styles.container, inStyle, props.containerStyle ]}
                source={{ uri: `${AxiosClient.defaults.baseURL}${props.uri}` }}
                resizeMode='cover'
        />
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: colors.white,
        borderWidth: 1,
    }
})
