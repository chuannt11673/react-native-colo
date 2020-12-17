import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View, Image, StyleProp, ViewStyle } from 'react-native';
import colors from '@shared/consts/Colors';

interface FunnyImageGridProps {
    images: string[];
    maxHeight?: number;
    containerStyle?: StyleProp<ViewStyle>
}
export default function FunnyImageGrid(props: FunnyImageGridProps) {
    let mode = modes.horizontal;
    const [itemStyles, setItemStyles] = useState(props.images.map(_ => ({})));
    const [maxHeight] = useState<number>(props.maxHeight ?? 50);
    const [percentage] = useState(props.images.length === 2 ? 0.5 : 0.6);

    const renderItem = (item: any, index: number) => {
        return <Image style={[styles.item, itemStyles[index]]} key={index} source={{ uri: item }} />
    };

    useEffect(() => {
        if (props.images.length === 0) {
            return;
        }
        Image.getSize(props.images[0], (w,h) => {
            if (w <= h) {
                mode = modes.vertical;
            }

            if (props.images.length === 1) {
                setItemStyles([{ width: windowWidth + '%', height: h * windowWidth / w + '%' }])
            } else {
                const imageStyles = props.images.map((img, index) => {
                    return mode === modes.horizontal ? getHorizontalStyle(index) : getVerticalStyle(index);
                });
                setItemStyles(imageStyles);
            }
        }, err => {
            throw err;
        })
    }, [props.images]);

    const getHorizontalStyle = (index: number) => {
        if (index === 0) {
            return {
                width: windowWidth + '%',
                height: maxHeight * percentage + '%'
            }
        }

        const maximumImages = Math.min(2, props.images.length - 1);
        return {
            width: windowWidth / maximumImages + '%',
            height: maxHeight * (1 - percentage) + '%',
            position: 'absolute',
            bottom: 0,
            left: windowWidth / maximumImages * (index - 1) + '%'
        }
    };

    const getVerticalStyle = (index: number) => {
        if (index === 0) {
            return {
                width: windowWidth * percentage + '%',
                height: maxHeight + '%'
            }
        }

        const maximumImages = Math.min(2, props.images.length - 1);
        return {
            width: windowWidth * (1 - percentage) + '%',
            height: maxHeight / maximumImages + '%',
            position: 'absolute',
            top: maxHeight / maximumImages * (index - 1) + '%',
            right: 0
        }
    }
    return (
        <View style={[styles.grid, props.containerStyle]}>
            {
                props.images.map((item, index) => renderItem(item, index))
            }
        </View>
    )
}

const modes = {
    horizontal: 1,
    vertical: 2
};
const windowWidth = 100;
const height = Dimensions.get('window').height * 0.5;
const styles = StyleSheet.create({
    grid: {
        width: '100%',
        height: height,
        overflow: 'hidden'
    },
    item: {
        borderWidth: 1,
        borderColor: colors.white
    }
});
