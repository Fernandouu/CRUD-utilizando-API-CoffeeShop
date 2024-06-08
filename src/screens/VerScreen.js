// VerScreen.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, Text, Alert } from 'react-native';
import UserCard from '../components/cards';

// IP del servidor 
let ip = `192.168.0.13`;

const VerScreen = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://${ip}/coffeeshop/api/services/admin/administrador.php?action=readAll`)
            .then(response => response.json())
            .then(data => {
                console.log("Datos recibidos del servidor:", data); // Verifica la estructura de los datos recibidos
                if (data.status === 1 && Array.isArray(data.dataset)) {
                    setUsers(data.dataset);  // Establece users solo si data.dataset es un arreglo
                } else {
                    setUsers([]);  // Si no hay usuarios o la estructura no es la esperada, setea el estado a un arreglo vacío
                    console.error('Datos no están en el formato esperado:', data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error al cargar los datos:", error);
                setLoading(false);
                setUsers([]);  // En caso de error, asegura que users es un arreglo vacío
            });
    }, []);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Cargando...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                {users.map(user => (
                    <UserCard
                        key={user.id_administrador}
                        nombre={user.nombre_administrador}
                        apellido={user.apellido_administrador}
                        correo={user.correo_administrador}
                        id={user.id_administrador}
                        handlerDelete={handlerDelete}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );

};
const handlerDelete = async (id) => {
    const urlE = `http://${ip}/coffeeshop/api/services/admin/administrador.php?action=deleteRow`;

    try {
        const response = await fetch(urlE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idAdministrador: id })
        });

        // Verifica si la respuesta tiene el tipo 'text/html' (HTML)
        if (response.headers.get('content-type').includes('text/html')) {
            throw new Error('La respuesta del servidor no es JSON válido.');
        }

        const datos = await response.json();
        if (datos.status) {
            Alert.alert('El usuario ha sido eliminado', datos.message);
        } else {
            console.log(datos);
            Alert.alert('Error', datos.error);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        Alert.alert('Error', 'Hubo un problema con la solicitud.');
    }
};


const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default VerScreen;
