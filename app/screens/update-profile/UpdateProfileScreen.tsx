import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TextInputProps, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

// components
import FnButton from '@components/FunnyButton2';
import FnHeader from '@components/FunnyHeader2';
import FunnyPicker2, { FunnyPickerProps } from '@components/FunnyPicker2';
import FnMultiplePicker from '@components/FunnyMultiplePicker';
import FnSlider from '@components/FunnySlider';

import styles from './UpdateProfileStyle';

import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';

import colors from '@shared/consts/Colors';
import { years, genders, ages } from '@shared/consts/CommonConstants';

import { updateProfile } from '@stores/reducers/ProfileReducer';
import { updateStatusBar } from '@stores/reducers/StatusBarReducer';

const listOfYear = years();
const listOfGender = genders();
const listOfAge = ages();

interface UpdateProfileTextInputProps extends TextInputProps {
    title?: string;
}
function UpdateProfileTextInput(props: UpdateProfileTextInputProps) {
    const [visible, setVisible] = useState(true);

    return (
        <>
            <Text style={styles.title} >{props.title}</Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <TextInput style={[styles.input, { width: '90%' }]} placeholder=''
                    {...props}
                />
                <FontAwesome name="dot-circle-o" size={24} color={
                    visible ? colors.primary : colors.border
                }
                    onPress={
                        () => setVisible(!visible)
                    }
                />
            </View>
        </>
    )
}

interface UpdateProfilePickerProps extends FunnyPickerProps {
    title?: string;
}
function UpdateProfilePicker(props: UpdateProfilePickerProps) {
    const [visible, setVisible] = useState(true);

    return (
        <>
            <Text style={styles.title} >{props.title}</Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <View style={{
                    width: '40%',
                }}>
                    <FunnyPicker2 containerStyle={{
                        width: '100%'
                    }}
                        {...props}
                    />
                </View>
                <FontAwesome name="dot-circle-o" size={24} color={
                    visible ? colors.primary : colors.border
                }
                    onPress={
                        () => setVisible(!visible)
                    }
                />
            </View>
        </>
    )
}

function UpdateProfileScreen(props: any) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<any>({
        ...props.profile,
        images: undefined
    });

    useEffect(() => {
        setData(props.profile);
        setLoading(false);
    }, [props.profile]);

    const onSaveHandler = () => {
        let images = props.profile.images;
        if (images?.length === 0) {
            images = data.images;
        }

        const profile = {
            ...data,
            images: images
        };

        props.updateProfile(profile);
        props.navigation.navigate('UploadProfileImages');
    };

    if (isLoading) {
        return (
            <View>
                <ActivityIndicator size='small' />
            </View>
        )
    };

    const basicInfo = () => {
        return (
            <View style={{
                width: '100%',
                borderRadius: 12,
                borderColor: colors.border,
                backgroundColor: '#f2f2f2',
                overflow: 'hidden',
            }}>
                <View style={{
                    width: '100%',
                    height: 46,
                    backgroundColor: '#002699',
                    justifyContent: 'center',
                }}>
                    <Text style={{ textAlign: 'center', color: colors.white, fontSize: 18 }}>Thiết lập hồ sơ hẹn hò</Text>
                </View>
                <View style={{
                    padding: 10,
                }}>
                    {/* name */}
                    <UpdateProfileTextInput title='Tên hiển thị *'
                        value={data.name}
                        onChangeText={
                            value => setData({
                                ...data,
                                name: value
                            })
                        }
                    />
                    {/* dob */}
                    <UpdateProfilePicker title='Năm sinh *'
                        items={listOfYear}
                        value={data.dob}
                        onValueChange={
                            value => setData({
                                ...data,
                                dob: value
                            })
                        }
                    />
                    {/* gender */}
                    <UpdateProfilePicker
                        title='Giới tính *'
                        items={listOfGender}
                        value={data.gender}
                        onValueChange={
                            value => setData({
                                ...data,
                                gender: value
                            })
                        }
                    />
                    {/* address */}
                    <UpdateProfileTextInput
                        title='Làm việc tại'
                        onChangeText={
                            value => setData({
                                ...data,
                                address: value
                            })
                        }
                        value={data.address}
                    />
                    {/* work address */}
                    <UpdateProfileTextInput
                        title='Công việc'
                        onChangeText={
                            value => setData({
                                ...data,
                                workAddress: value
                            })
                        }
                        value={data.workAddress}
                    />
                    {/* college */}
                    <UpdateProfileTextInput
                        title='Học tại'
                        onChangeText={
                            value => setData({
                                ...data,
                                college: value
                            })
                        }
                        value={data.college}
                    />
                    {/* hobbies */}
                    <UpdateProfileTextInput
                        title='Sở thích'
                        multiline
                        placeholder='Nghe nhạc, Xem phim,...'
                        onChangeText={
                            value => setData({
                                ...data,
                                hobbies: value
                            })
                        }
                        value={data.hobbies}
                    />
                    {/* brief message */}
                    <UpdateProfileTextInput
                        title='Giới thiệu bản thân'
                        multiline
                        onChangeText={
                            value => setData({
                                ...data,
                                briefMessage: value
                            })
                        }
                        value={data.briefMessage}
                    />
                </View>
            </View>
        )
    };

    const targetInfo = () => {
        return (
            <View style={{
                width: '100%',
                borderRadius: 12,
                borderColor: colors.border,
                backgroundColor: '#f2f2f2',
                overflow: 'hidden',
                marginTop: 20
            }}>
                <View style={{
                    width: '100%',
                    height: 46,
                    backgroundColor: '#002699',
                    justifyContent: 'center',
                }}>
                    <Text style={{ textAlign: 'center', color: colors.white, fontSize: 18 }}>Thiết lập đối tượng hẹn hò</Text>
                </View>
                <View style={{
                    padding: 10
                }}>
                    {/* target */}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <View style={{
                            width: '39%'
                        }}>
                            <Text style={styles.title} >Giới tính</Text>
                            <View style={{
                                width: '90%',
                            }}>
                                <FunnyPicker2 placeholder='Select a gender' containerStyle={{
                                    width: '100%'
                                }}
                                    items={listOfGender}
                                    value={data.targetGender}
                                    onValueChange={
                                        value => setData({
                                            ...data,
                                            targetGender: value
                                        })
                                    }
                                />
                            </View>
                        </View>
                        <View style={{
                            width: '23%'
                        }}>
                            <Text style={styles.title} >Độ tuổi</Text>
                            <FnMultiplePicker
                                item={{
                                    firstItems: listOfAge,
                                    secondItems: listOfAge
                                }}
                                placeholder={{
                                    first: ' ',
                                    second: ' '
                                }}
                                value={{
                                    first: data.targetFromAge,
                                    second: data.targetToAge
                                }}
                                onFirstValueChange={
                                    value => setData({
                                        ...data,
                                        targetFromAge: value
                                    })
                                }
                                onSecondValueChange={
                                    value => setData({
                                        ...data,
                                        targetToAge: value
                                    })
                                }
                            />
                        </View>
                    </View>

                    {/* range */}
                    <View style={{
                        width: '100%'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={styles.title}>Khoảng cách tối đa</Text>
                            <Text style={[styles.title, { fontWeight: '400' }]}>{data.targetDistance ?? 0} km</Text>
                        </View>
                        <FnSlider minimumValue={0} maximumValue={1000}
                            value={data.targetDistance}
                            onValueChange={
                                value => {
                                    const distance = Math.round(value);
                                    setData({
                                        ...data,
                                        targetDistance: distance
                                    });
                                }
                            }
                        />
                    </View>
                </View>
            </View>
        )
    }

    return (
        <>
            <FnHeader
                title='Thiết lập hồ sơ hẹn hò'
                leftComponent={
                    <TouchableOpacity onPress={
                        () => props.navigation.navigate('Dating')
                    }>
                        <Ionicons name="md-arrow-back" size={24} color={colors.white} />
                    </TouchableOpacity>
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

                        <ScrollView
                            contentContainerStyle={{
                                alignItems: 'center'
                            }}
                            style={{
                                padding: 15,
                            }}
                        >
                            {
                                basicInfo()
                            }
                            {
                                targetInfo()
                            }
                            {/* save btn */}
                            <FnButton
                                title='Tiếp theo'
                                containerStyle={{
                                    backgroundColor: colors.primary,
                                    borderRadius: 24,
                                    marginTop: 20,
                                    width: '90%',
                                    height: 50
                                }}
                                titleStyle={{
                                    color: colors.white,
                                    fontSize: 15
                                }}
                                disabled={
                                    !data || !data.name || !data.gender ? true : false
                                }
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

const mapStateToProps = (state: any) => {
    return {
        profile: state.profileReducer.profile,
        statusBar: state.statusBarReducer
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateProfile: (profile: any) => {
            dispatch(updateProfile(profile));
        },
        updateStatusBar: (data: any) => {
            dispatch(updateStatusBar(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileScreen);
