import React from 'react'
import { Header } from 'react-native-elements';

import * as ExpoGradient from 'expo-linear-gradient';

import colors from '@shared/consts/Colors';

import { Ionicons } from '@expo/vector-icons';

const FunnyGradient: any = ExpoGradient.LinearGradient;
interface FunnyHeaderProps {
    title?: string;
    leftComponent?: any;
    rightComponent?: any;
    navigation?: any
};
export default function FunnyHeader(props: FunnyHeaderProps) {

    const menuPressHandler = () => {
        props.navigation?.openDrawer();
    }

    return (
        <>
            <Header
                leftComponent={
                    props.leftComponent ?? (
                        <Ionicons name="ios-menu" size={24}  color={colors.white} onPress={ menuPressHandler } />
                    )
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


