import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import colors from 'shared/consts/Colors';

interface FunnyImageGrid2Props {
    images: string[];
}

const width = Dimensions.get('window').width;

// 1 image
function Grid1(props : { uri: string }) {
    const [height, setHeight] = React.useState(0);
    React.useEffect(() => {
        Image.getSize(props.uri, (w, h) => {
            const ratio = width / w;
            setHeight(h * ratio);
        });
    }, []);

    return (
        <Image source={{ uri: props.uri }} style={[styles.image ,{ width: '100%', height: height, resizeMode: 'cover' }]} />
    )
}

// 2 images
function Grid2(props: { images: string[] }) {
    return (
        <View style={{
            flexDirection: 'row'
        }}>
            {
                props.images.map((uri, index) => (
                    <Image key={index} source={{ uri: uri }} style={[styles.image ,{ width: '50%', minHeight: width }]}/>
                ))
            }
        </View>
    )
}

// greater than 2
function Grid3(props: { images: string[] }) {
    const [childrenLength, setLength] = React.useState(2);

    React.useEffect(() => {
        if (props.images.length - 1 > 2) {
            setLength(3);
        }
    }, []);

    return (
        <View style={{
            flexDirection: 'row',
            height: width
        }}>
            <View style={{
                width: '60%',
                height: '100%'
            }}>
                <Image source={{ uri: props.images[0] }} style={[styles.image ,{ width: '100%', height: '100%' }]} />
            </View>
            <View style={{
                width: '40%',
                height: '100%',
                position: 'relative'
            }}>
                {
                    props.images.map((uri, index) => {
                        if (index === 0)
                            return null;

                        const top = (index - 1) * 100 / childrenLength + '%';
                        const height = 100 / childrenLength + '%';

                        return index === 0 ? null : (
                            <Image key={index} source={{ uri: uri }} style={[styles.image ,{ width: '100%', height: height, position: 'absolute', top: top, right: 0 }]} />
                        )
                    })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        borderWidth: 1.5,
        borderColor: colors.white,
    }
});

export default function FunnyImageGrid2(props: FunnyImageGrid2Props) {
    if (props.images.length === 0) {
        return null;
    }

    if (props.images.length === 1) {
        return (
            <Grid1 uri={props.images[0]}/>
        )
    }

    if (props.images.length === 2) {
        return (
            <Grid2 images={props.images} />
        )
    }

    return (
        <Grid3 images={props.images} />
    )
}
