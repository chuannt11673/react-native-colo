import { StyleSheet } from 'react-native';
import colors from '@shared/consts/Colors';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    header: {
        fontSize: RFValue(21),
        textTransform: 'uppercase',
        marginTop: 20
    },
    description: {
        width: '72%',
        textAlign: 'center'
    },
    inputs: {
        flexDirection: 'row',
        width: 250,
        justifyContent: 'space-around',
        paddingTop: 20
    },
    input: {
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 8,
        width: 46,
        height: 46,
        textAlign: 'center'
    },
    loginButtonContainer: {
        width: '79%',
        marginTop: 30,
        backgroundColor: colors.primary,
        borderRadius: 20,
        height: 50
    },
    loginTitle: {
        color: colors.white,
        fontSize: 15
    },
    getCode: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    getCodeButton: {
        marginLeft: 5
    },
    getCodeButtonText: {
        color: colors.primary
    }
});

export default styles;
