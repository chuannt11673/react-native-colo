import { Platform, StyleSheet } from 'react-native';
import colors from '@shared/consts/Colors';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    header: {
        fontSize: RFValue(23),
        fontWeight: '600',
        marginBottom: 20
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
});

export default styles;
