import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { Button } from 'react-native-elements';

import colors from '@shared/consts/Colors';

import { Ionicons } from '@expo/vector-icons';
import FunnyHeader from '@components/FunnyHeader';

import styles from './UpdateProfileStyle';

import { FontAwesome } from '@expo/vector-icons';

import RNPickerSelect from 'react-native-picker-select';
import FunnyButton from 'components/FunnyButton';

export default function UpdateProfileScreen({ navigation }: any) {
    const [fromAges, setFromAges] = useState<any>();
    const [toAges, setToAges] = useState<any>();

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let count = 18;
        const fromAges = [];
        const toAges = [];
        while (count <= 50) {
            fromAges.push({ label: `${count}`, value: `from ${count}` });
            toAges.push({ label: `${count}`, value: `to ${count}` });
            count++;
        }
        setFromAges(fromAges);
        setToAges(toAges);
        setLoading(false);
    }, []);

    const basicInfoForm = () => {
        return (
            <SafeAreaView>
                <ScrollView style={{
                    padding: 15,
                }}>
                    <Text style={styles.title} >Tên hiển thị</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <TextInput style={[styles.input, { width: '90%' }]} placeholder='' />
                        <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                    </View>

                    <Text style={styles.title} >Độ tuổi</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <TextInput style={[styles.input, { width: '90%' }]} placeholder='' />
                        <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                    </View>

                    <Text style={styles.title} >Quê quán</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <TextInput style={[styles.input, { width: '90%' }]} placeholder='' />
                        <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                    </View>

                    <Text style={styles.title} >Công việc</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <TextInput style={[styles.input, { width: '90%' }]} placeholder='' />
                        <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <View style={{
                            width: '50%'
                        }}>
                            <Text style={styles.title} >Đối tượng hẹn hò</Text>
                            <RNPickerSelect
                                style={{
                                    inputIOS: styles.targetRNPicker,
                                    inputAndroid: styles.targetRNPicker
                                }}
                                onValueChange={
                                    (value: any) => {

                                    }
                                }
                                items={[
                                    { label: 'Nam', value: 'male' },
                                    { label: 'Nữ', value: 'female' }
                                ]}
                            />
                        </View>
                        <View style={{
                            width: '40%'
                        }}>
                            <Text style={styles.title} >Chiều cao</Text>
                            <RNPickerSelect
                                style={{
                                    inputIOS: styles.heightRNPicker,
                                    inputAndroid: styles.heightRNPicker
                                }}
                                onValueChange={
                                    (value: any) => {

                                    }
                                }
                                items={[
                                    { label: '150 cm', value: '150' },
                                    { label: '160 cm', value: '160' },
                                    { label: '170 cm', value: '170' },
                                    { label: '180 cm', value: '180' },
                                    { label: '190 cm', value: '190' },
                                ]}
                            />
                        </View>
                        <View style={{
                            width: '10%',
                            justifyContent: 'center',
                            alignItems: 'flex-end'
                        }}>
                            <Text style={styles.title} ></Text>
                            <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                        </View>
                    </View>

                    <Text style={styles.title} >Tìm kiếm theo đuổi</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <RNPickerSelect
                            style={{
                                inputIOS: styles.ageRangeRNPicker,
                                inputAndroid: styles.ageRangeRNPicker
                            }}
                            onValueChange={(value) => console.log(value)}
                            items={fromAges}
                        />
                        <Text style={{
                            padding: 5
                        }}>
                            to
                        </Text>
                        <RNPickerSelect
                            style={{
                                inputIOS: styles.ageRangeRNPicker,
                                inputAndroid: styles.ageRangeRNPicker
                            }}
                            onValueChange={(value) => console.log(value)}
                            items={toAges}
                        />
                    </View>

                    <Text style={styles.title} >Ghi chú</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <TextInput style={[styles.input, { width: '90%', height: 'auto', minHeight: 46 }]} placeholder='' multiline />
                        <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                    </View>


                </ScrollView>
                {/* next button */}
                <FunnyButton
                    containerStyle={{
                        marginTop: 20,
                        width: '100%',
                        alignItems: 'center'
                    }}
                    buttonStyle={{
                        backgroundColor: colors.primary,
                        borderRadius: 12,
                        width: 200,
                        height: 50
                    }}
                    titleStyle={{
                        color: colors.white
                    }}
                    title='Tiếp theo'
                />
            </SafeAreaView>
        )
    };

    if (isLoading)
        return (
            <View>
                <ActivityIndicator size='small' />
            </View>
        )

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={
                Platform.OS === 'ios' ? 'padding' : 'height'
            }
        >
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
            >
                <View>
                    <FunnyHeader
                        title='Thiết lập hồ sơ hẹn hò'
                        leftComponent={
                            <Button
                                icon={
                                    <Ionicons name="md-arrow-back" size={24} color={colors.white} />
                                }
                                buttonStyle={{ backgroundColor: 'transparent' }}
                                onPress={
                                    () => navigation.goBack()
                                }
                            />
                        }
                        rightComponent={
                            <View />
                        }
                    />
                    {
                        basicInfoForm()
                    }
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
