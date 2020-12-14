import { StyleSheet } from 'react-native';
import colors from '@shared/consts/Colors';

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 6,
    },
    input: {
        width: '100%',
        height: 46,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 6,
        justifyContent: 'center',
        paddingLeft: 6,
        paddingRight: 6
    },
    targetRNPicker: {
        width: '90%',
        height: 46,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 6,
        justifyContent: 'center',
        paddingLeft: 6,
        paddingRight: 6
    },
    heightRNPicker: {
        width: '100%',
        height: 46,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 6,
        justifyContent: 'center',
        paddingLeft: 6,
        paddingRight: 6
    },
    ageRangeRNPicker: {
        width: 50,
        height: 46,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 6,
        paddingRight: 6
    }
});

export default styles;
