import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

// components
import FnButton from '@components/FunnyButton2';
import FnHeader from '@components/FunnyHeader2';
import FunnyPicker2 from '@components/FunnyPicker2';
import FnMultiplePicker from '@components/FunnyMultiplePicker';

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
        if (images.length === 0) {
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
                borderWidth: 0.8,
                borderRadius: 12,
                borderColor: colors.border,
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
                    padding: 6,
                }}>
                    {/* name */}
                    <Text style={styles.title} >Tên hiển thị *</Text>
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
                    {/* dob */}
                    <Text style={styles.title} >Năm sinh *</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            width: '40%',
                        }}>
                            <FunnyPicker2 placeholder='Select a year' containerStyle={{
                                width: '100%'
                            }}
                                items={listOfYear}
                                value={data.dob}
                                onValueChange={
                                    value => setData({
                                        ...data,
                                        dob: value
                                    })
                                }
                            />
                        </View>
                        <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                    </View>
                    {/* gender */}
                    <Text style={styles.title} >Giới tính *</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            width: '40%',
                        }}>
                            <FunnyPicker2 placeholder='Select a gender' containerStyle={{
                                width: '100%'
                            }}
                                items={listOfGender}
                                value={data.gender}
                                onValueChange={
                                    value => setData({
                                        ...data,
                                        gender: value
                                    })
                                }
                            />
                        </View>
                        <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                    </View>
                    {/* address */}
                    <Text style={styles.title} >Làm việc tại</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <TextInput
                            style={[styles.input, { width: '90%' }]}
                            placeholder=''
                            onChangeText={
                                value => setData({
                                    ...data,
                                    address: value
                                })
                            }
                            value={data.address}
                        />
                        <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                    </View>
                    {/* work address */}
                    <Text style={styles.title} >Công việc</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <TextInput style={[styles.input, { width: '90%' }]} placeholder=''
                            onChangeText={
                                value => setData({
                                    ...data,
                                    workAddress: value
                                })
                            }
                            value={data.workAddress}
                        />
                        <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                    </View>
                    {/* college */}
                    <Text style={styles.title} >Học tại</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <TextInput style={[styles.input, { width: '90%' }]} placeholder=''
                            onChangeText={
                                value => setData({
                                    ...data,
                                    college: value
                                })
                            }
                            value={data.college}
                        />
                        <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                    </View>
                    {/* hobbies */}
                    <Text style={styles.title} >Sở thích</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <TextInput
                            style={[styles.input, { width: '90%' }]}
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
                        <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                    </View>
                    {/* brief message */}
                    <Text style={styles.title} >Giới thiệu bản thân</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <TextInput style={[styles.input, { width: '90%', height: 'auto', minHeight: 46 }]} placeholder='' multiline
                            onChangeText={
                                value => setData({
                                    ...data,
                                    briefMessage: value
                                })
                            }
                            value={data.briefMessage}
                        />
                        <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                    </View>
                </View>
            </View>
        )
    };

    const targetInfo = () => {
        return (
            <View style={{
                width: '100%',
                borderWidth: 0.8,
                borderRadius: 12,
                borderColor: colors.border,
                overflow: 'hidden',
                marginTop: 15
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
                    padding: 6
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
                            width: '30%'
                        }}>
                            <Text style={styles.title} >Độ tuổi</Text>
                            <FnMultiplePicker
                                item={{
                                    firstItems: listOfAge,
                                    secondItems: listOfAge
                                }}
                                placeholder={{
                                    first: 'fr',
                                    second: 'to'
                                }}
                                value={{
                                    first: data.fromAge,
                                    second: data.toAge
                                }}
                                onFirstValueChange={
                                    value => setData({
                                        ...data,
                                        fromAge: value
                                    })
                                }
                                onSecondValueChange={
                                    value => setData({
                                        ...data,
                                        toAge: value
                                    })
                                }
                            />
                        </View>
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
                                    borderRadius: 12,
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
