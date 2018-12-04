import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

export const AddNewButton = (props) => {
    return(
        <TouchableOpacity style={styles.buttonContainer} onPress={props.navigateToFormPage}>
            <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        width: 50,
        height: 50,
        bottom: 20,
        right: 15,
        borderRadius: 50/2,
        backgroundColor: '#1250c4',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center'
        // paddingVertical: 1,
    },
    buttonText: {
        fontSize: 35,
        // fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700'
    }
});