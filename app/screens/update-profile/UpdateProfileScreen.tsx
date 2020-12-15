import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { Button } from 'react-native-elements';

import colors from '@shared/consts/Colors';

import { Ionicons } from '@expo/vector-icons';
import FunnyHeader from '@components/FunnyHeader';
import FunnyButton from '@components/FunnyButton';

import styles from './UpdateProfileStyle';

import { FontAwesome } from '@expo/vector-icons';

import RNPickerSelect from 'react-native-picker-select';

import { connect } from 'react-redux';
import { updateProfile } from '@stores/actions/profile';

function UpdateProfileScreen(props: any) {
    const [fromAges, setFromAges] = useState<any>();
    const [toAges, setToAges] = useState<any>();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<any>(props.profile);

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

    const onSaveHandler = () => {
        props.updateProfileAsync(data);
        props.navigation.navigate('UploadProfileImages');
    };

    if (isLoading)
        return (
            <View>
                <ActivityIndicator size='small' />
            </View>
        )

    return (
        <>
            <FunnyHeader
                title='Thiết lập hồ sơ hẹn hò'
                leftComponent={
                    <Button
                        icon={
                            <Ionicons name="md-arrow-back" size={24} color={colors.white} />
                        }
                        buttonStyle={{ backgroundColor: 'transparent' }}
                        onPress={
                            () => props.navigation.goBack()
                        }
                    />
                }
                rightComponent={
                    <View />
                }
            />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={
                    Platform.OS === 'ios' ? 'padding' : 'height'
                }
            >
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                >
                    <ScrollView style={{
                        flex: 1,
                        paddingBottom: 50
                    }}>
                        
                        <ScrollView style={{
                            padding: 15,
                        }}>
                            <Text style={styles.title} >Tên hiển thị</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <TextInput style={[styles.input, { width: '90%' }]} placeholder='' onChangeText={
                                    value => setData({
                                        ...data,
                                        name: value
                                    })
                                } />
                                <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                            </View>

                            <Text style={styles.title} >Năm sinh</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <TextInput style={[styles.input, { width: '90%' }]} placeholder='' onChangeText={
                                    value => setData({
                                        ...data,
                                        dob: value
                                    })
                                } />
                                <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                            </View>

                            <Text style={styles.title} >Giới tính</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{
                                    width: '50%'
                                }}>
                                    <RNPickerSelect
                                        style={{
                                            inputIOS: styles.targetRNPicker,
                                            inputAndroid: styles.targetRNPicker
                                        }}
                                        onValueChange={
                                            (value: any) => setData({
                                                ...data,
                                                gender: value
                                            })
                                        }
                                        items={[
                                            { label: 'Nam', value: 'male' },
                                            { label: 'Nữ', value: 'female' }
                                        ]}
                                    />
                                </View>
                                <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                            </View>

                            <Text style={styles.title} >Quê quán</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <TextInput style={[styles.input, { width: '90%' }]} placeholder='' onChangeText={
                                    value => setData({
                                        ...data,
                                        hometown: value
                                    })
                                } />
                                <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                            </View>

                            <Text style={styles.title} >Công việc</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <TextInput style={[styles.input, { width: '90%' }]} placeholder='' onChangeText={
                                    value => setData({
                                        ...data,
                                        job: value
                                    })
                                } />
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
                                            (value: any) => setData({
                                                ...data,
                                                targetGender: value
                                            })
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
                                            (value: any) => setData({
                                                ...data,
                                                targetHeight: value
                                            })
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

                            <Text style={styles.title} >Độ tuổi</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <RNPickerSelect
                                    style={{
                                        inputIOS: styles.ageRangeRNPicker,
                                        inputAndroid: styles.ageRangeRNPicker
                                    }}
                                    onValueChange={
                                        value => setData({
                                            ...data,
                                            fromAge: value
                                        })
                                    }
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
                                    onValueChange={
                                        value => setData({
                                            ...data,
                                            toAge: value
                                        })
                                    }
                                    items={toAges}
                                />
                            </View>

                            <Text style={styles.title} >Ghi chú</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <TextInput style={[styles.input, { width: '90%', height: 'auto', minHeight: 46 }]} placeholder='' multiline onChangeText={
                                    value => setData({
                                        ...data,
                                        note: value
                                    })
                                } />
                                <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                            </View>
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
                                onPress={
                                    onSaveHandler
                                }
                            />
                        </ScrollView>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfileAsync: (profile) => {
            dispatch(updateProfile(profile));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileScreen);
