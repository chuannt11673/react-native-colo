import { Platform, StyleSheet } from 'react-native';
import colors from '@shared/consts/Colors';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.white,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    logo: {
        height: '30%',
        justifyContent: 'center'
    },
    logoText: {
        color: colors.primary,
        fontSize: RFPercentage(15),
        fontFamily: Platform.OS === 'android' ? 'serif' : 'Avenir',
        top: 20
    },
    header: {
        fontSize: RFValue(23),
        fontWeight: '600',
        marginBottom: 15
    },
    forgotPassword: {
        alignItems: 'flex-end',
        width: '76%',
        marginTop: 10
    },
    forgotPasswordText: {
        color: colors.hyperlink
    },
    loginButtonContainer: {
        width: '79%',
        marginTop: 30
    },
    loginButton: {
        backgroundColor: colors.primary,
        borderRadius: 20,
        height: 50
    },
    otherLoginText: {
        marginTop: 20,
        fontSize: 16
    },
    externalLogin: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '80%'
    },
    externalLoginContainer: {
        width: 130,
        marginTop: 20
    },
    externalLoginButton: {
        justifyContent: 'space-evenly',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.black1,
        borderRadius: 12
    },
    externalLoginTitle: {
        color: colors.black
    },
    registerContainer: {
        marginTop: 20,
        flexDirection: 'row'
    },
    registerButtonText: {
        color: colors.primary
    },
    errorMessage: {
        marginTop: 20,
    },
    error: {
        color: colors.primary
    }
});

export default styles;
