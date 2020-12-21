import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { Header } from 'react-native-elements';

import colors from '@shared/consts/Colors';

import FunnyButton from '@components/FunnyButton';

import styles from './UpdateProfileStyle';

import { FontAwesome } from '@expo/vector-icons';

import RNPickerSelect from 'react-native-picker-select';

import { connect } from 'react-redux';
import { updateProfile } from '@stores/actions/profile';

function UpdateProfileScreen(props: any) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<any>(props.profile ?? {});

    const [fromAges, setFromAges] = useState<any>();
    const [toAges, setToAges] = useState<any>();
    const [years, setYears] = useState<any[]>([]);

    useEffect(() => {
        //  set ages
        const fromAges = [];
        const toAges = [];
        for (let index = 18; index < 50; index++) {
            fromAges.push({ label: `${index}`, value: `from ${index}` });
            toAges.push({ label: `${index}`, value: `to ${index}` });
        }
        setFromAges(fromAges);
        setToAges(toAges);

        // get years
        const now = new Date();
        const years = [];
        for (let index = 1960; index < now.getFullYear(); index++) {
            years.push({ label: `${index}`, value: `${index}` });
        }
        setYears(years);
        setLoading(false);
    }, []);

    const onSaveHandler = () => {
        props.updateProfile({
            ...props.profile,
            ...data,
            dob: `01/01/${data.dob}`,
            breifMessage: data.note
        });
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
            <Header
                containerStyle={{
                    backgroundColor: colors.white
                }}
                centerComponent={
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>Thiết lập hồ sơ hẹn hò</Text>
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
                        paddingBottom: 50,
                        backgroundColor: colors.white
                    }}>
                        
                        <ScrollView style={{
                            padding: 25,
                        }}>
                            <Text style={styles.title} >Tên hiển thị</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <TextInput style={[styles.input, { width: '90%' }]} placeholder=''
                                    onChangeText={
                                        value => setData({
                                            ...data,
                                            name: value
                                        })
                                    }
                                    value={data.name}
                                />
                                <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                            </View>

                            <Text style={styles.title} >Năm sinh</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <RNPickerSelect
                                    style={{
                                        inputIOS: styles.targetRNPicker,
                                        inputAndroid: styles.targetRNPicker
                                    }}
                                    onValueChange={
                                        (value: any) => setData({
                                            ...data,
                                            dob: value
                                        })
                                    }
                                    items={years}
                                    value={data.dob}
                                />
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
                                        value={data.gender}
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
                                }}
                                buttonStyle={{
                                    backgroundColor: colors.primary,
                                    borderRadius: 12,
                                    width: '90%',
                                    height: 50
                                }}
                                titleStyle={{
                                    color: colors.white
                                }}
                                title='Tiếp theo'
                                onPress={
                                    onSaveHandler
                                }
                                disabled={
                                    !data || !data.name || !data.dob || !data.gender ? true : false
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
        updateProfile: (profile) => {
            dispatch(updateProfile(profile));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileScreen);
