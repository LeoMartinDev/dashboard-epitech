/**
 * Created by desver_f on 06/03/17.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';

const LoginMessage = ({ message }) => {
    return (
        <Text style={styles.loginMessage}>
            { message }
        </Text>
    );
};

LoginMessage.propTypes = {
    message: React.PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    loginMessage: {
        color: 'white',
        fontFamily: 'Nunito-Light',
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 15,
    }
});

export default LoginMessage;
