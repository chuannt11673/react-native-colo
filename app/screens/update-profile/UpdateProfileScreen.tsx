import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Header } from 'react-native-elements';

import FunnyButton from '@components/FunnyButton';

import styles from './UpdateProfileStyle';

import { FontAwesome, Ionicons } from '@expo/vector-icons';

import RNPickerSelect from 'react-native-picker-select';

import { connect } from 'react-redux';
import { updateProfile } from '@stores/actions/profile';

import { getProfile } from '@shared/services/UserService';

import colors from '@shared/consts/Colors';
import { years } from '@shared/consts/CommonConstants';

const listOfYear = years();
function UpdateProfileScreen(props: any) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<any>({
        ...props.profile,
        images: undefined
    });

    useEffect(() => {
        if (props.profile && props.profile.name) {
            setLoading(false);
            return;
        }

        getProfile().then(res => {
            if (res.data) {
                const item = res.data;
                const profile = {
                    ...item,
                    dob: (new Date(item.dob)).getFullYear() + '',
                    images: item.images.map((image: any) => ({
                        filename: null,
                        uri: image.url
                    }))
                };
                setData(profile);
                props.updateProfile(profile);
            }
            setLoading(false);
        });
    }, []);

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
                leftComponent={
                    props.profile && props.profile.name ? (
                        <Button
                        icon={
                            <Ionicons name="md-arrow-back" size={24} color={colors.black} />
                        }
                        buttonStyle={{ backgroundColor: 'transparent' }}
                        onPress={
                            () => props.navigation.navigate('Dating')
                        }
                    />
                    ) : <View />
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
                                    items={
                                        listOfYear.map(year => ({
                                            label: year, value: year
                                        }))
                                    }
                                    value={data.dob}
                                />
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
                            {/* target */}
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
                            {/* target ages */}
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
                                    items={[]}
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
                                    items={[]}
                                />
                            </View>
                            {/* brief message */}
                            <Text style={styles.title} >Ghi chú</Text>
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
                            {/* save btn */}
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
                                    !data || !data.name || !data.gender ? true : false
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
        profile: state.profileReducer.profile
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateProfile: (profile: any) => {
            dispatch(updateProfile(profile));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileScreen);
