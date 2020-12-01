import { Dimensions, StyleSheet } from 'react-native';
import colors from '@shared/consts/Colors';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    }
})

export const itemStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    item: {
        width: windowWidth,
		height: 100,
		borderBottomWidth: 1,
        borderBottomColor: colors.black1,
        justifyContent: 'center',
    },
    avatar: {
		left: 10,
		marginRight: 20,
		width: 60,
		height: 60,
		borderRadius: 60,
    },
    name: {
        position: 'absolute',
		top: 25,
		left: 80,
		fontSize: 16,
		fontWeight: "bold"
    },
    message: {
        position: 'absolute',
		top: 50,
		left: 80,
		fontSize: 14,
		width: '60%',
    },
    time: {
        position: 'absolute',
		top: 10,
		right: 20,
		color: colors.black
    },
    badge: {
        position: 'absolute',
		top: 30,
		right: 20,
		width: 30,
		backgroundColor: colors.secondary,
		textAlign: "center",
		borderRadius: 12,
		padding: 2,
		justifyContent: 'center',
		alignItems: 'center'
    },
    text: {
        color: colors.white
    }
});
