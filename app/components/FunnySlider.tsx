import React from 'react';
import { View } from 'react-native';
import Slider from '@react-native-community/slider';

interface FunnySliderProps {
    minimumValue: number;
    maximumValue: number;
    onValueChange?: (value: number) => void;
}
export default function FunnySlider(props: FunnySliderProps) {
    return (
        <View style={{
            width: '100%'
        }}>
            <Slider
                style={{ width: '100%', height: 40, padding: 0 }}
                minimumValue={props.minimumValue}
                maximumValue={props.maximumValue}
                minimumTrackTintColor="#009900"
                maximumTrackTintColor="#000000"
                onValueChange={
                    value => {
                        if (props.onValueChange) {
                            props.onValueChange(value);
                        }
                    }
                }
            />
        </View>
    )
}
