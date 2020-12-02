import React from 'react'
import { Header } from 'react-native-elements';
import colors from '@shared/consts/Colors';
import * as ExpoGradient from 'expo-linear-gradient';
import { StatusBar } from 'react-native';

const FunnyGradient: any = ExpoGradient.LinearGradient;
interface FunnyHeaderProps {
    title?: string;
    leftComponent?: any;
    rightComponent?: any;
};
export default function FunnyHeader(props: FunnyHeaderProps) {
    return (
        <>
            <StatusBar barStyle='light-content' />
            <Header
                leftComponent={
                    props.leftComponent ?? { icon: 'menu', color: colors.white }
                }
                centerComponent={
                    { text: props.title ?? 'Title', style: { color: colors.white, fontSize: 18 } }
                }
                rightComponent={
                    props.rightComponent ?? { icon: 'home', color: colors.white }
                }
                ViewComponent={
                    FunnyGradient
                }
                linearGradientProps={{
                    colors: [colors.primary, colors.secondary],
                    start: { x: 0, y: 0.5 },
                    end: { x: 1, y: 0.5 },
                }}
            />
        </>
    )
}


