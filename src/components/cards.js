import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const UserCard = ({ nombre, apellido, correo, id, onPress, onDelete }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.text}>{nombre}</Text>
            <Text style={styles.label}>Apellido:</Text>
            <Text style={styles.text}>{apellido}</Text>
            <Text style={styles.label}>Correo:</Text>
            <Text style={styles.text}>{correo}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onDelete} style={[styles.button, { backgroundColor: 'red' }]}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: 'green' }]}>
                    <Text style={styles.buttonText}>Actualizar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    label: {
        fontSize: 14,
        color: '#888888',
        marginBottom: 5,
    },
    text: {
        fontSize: 18,
        color: '#333333',
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        paddingVertical: 10,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default UserCard;
