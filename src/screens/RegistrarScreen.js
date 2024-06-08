import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const RegistarScreen = () => {

    //Estado de la app
    const [alias, setAlias] = useState('');
    const [clave, setClave] = useState('');
    const [claveconfirmada, setCofirmarClave] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    
    let ip = `192.168.0.13`;
    const handleCreate = async () => {
        // Lógica de inicio de sesión

        let url = `http://${ip}/coffeeshop/api/services/admin/administrador.php?action=createRow`;
        const formData = new FormData();
        formData.append('nombreAdministrador', nombre)
        formData.append('apellidoAdministrador', apellido)
        formData.append('correoAdministrador', correo)
        formData.append('aliasAdministrador', alias)
        formData.append('claveAdministrador', clave)
        formData.append('confirmarClave', claveconfirmada)

        //Realizar la petición http 
        const fetchApi = await fetch(url, {
            method: 'POST',
            body: formData
        })
        const datos = await fetchApi.json();
        if (datos.status) {
            Alert.alert('Usuario registrado exitosamente');
        }
        else {
            console.log(datos);
            // Alert the user about the error
            Alert.alert('Error al registrar usuario', datos.error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrar a un administrador</Text>
            <TextInput
                label="Nombre"
                value={nombre}
                onChangeText={setNombre}
                style={styles.input}
                keyboardType="text"
                autoCapitalize="none"
            />
            <TextInput
                label="Apellido"
                value={apellido}
                onChangeText={setApellido}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                label="Correo"
                value={correo}
                onChangeText={setCorreo}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                label="Usuario"
                value={alias}
                onChangeText={setAlias}
                style={styles.input}
                keyboardType="text"
                autoCapitalize="none"
            />
            <TextInput
                label="Contraseña"
                value={clave}
                onChangeText={setClave}
                style={styles.input}
                secureTextEntry
            />
            <TextInput
                label="Confima la contraseña"
                value={claveconfirmada}
                onChangeText={setCofirmarClave}
                style={styles.input}
                secureTextEntry
            />
            <Button mode="contained" onPress={handleCreate} style={styles.button}>
                Crear administrador
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#6200ee',
    },
    input: {
        marginBottom: 15,
        backgroundColor: 'white',
    },
    button: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#6200ee',
    },
});

export default RegistarScreen;
