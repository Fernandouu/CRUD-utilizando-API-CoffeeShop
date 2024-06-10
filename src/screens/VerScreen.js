import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, Text, Alert } from 'react-native';
import UserCard from '../components/cards';
import ModalUser from '../components/ModalUser';

// IP del servidor 
let ip = `192.168.0.2`;

const VerScreen = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalType, setModalType] = useState('edit');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [alias, setAlias] = useState('');
    const [clave, setClave] = useState('');
    const [confirmarClave, setConfirmarClave] = useState('');

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = () => {
        setLoading(true);
        fetch(`http://${ip}/coffeeshop/api/services/admin/administrador.php?action=readAll`)
            .then(response => response.json())
            .then(data => {
                console.log("Datos recibidos del servidor:", data);
                if (data.status === 1 && Array.isArray(data.dataset)) {
                    setUsers(data.dataset);
                } else {
                    setUsers([]);
                    console.error('Datos no están en el formato esperado:', data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error al cargar los datos:", error);
                setLoading(false);
                setUsers([]);
            });
    };

    const openModal = (user) => {
        setNombre(user.nombre_administrador);
        setApellido(user.apellido_administrador);
        setCorreo(user.correo_administrador);
        setAlias(user.alias_administrador || '');  // Asegúrate de tener el alias si está disponible
        setSelectedUser(user);
        setModalType('edit');
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const handleDelete = async (userId) => {
        try {
            const formData = new FormData();
            formData.append('idAdministrador', userId);
            const response = await fetch(`http://${ip}/coffeeshop/api/services/admin/administrador.php?action=deleteRow`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.status) {
                Alert.alert('Éxito', data.message);
                fetchUsuarios();
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al eliminar el usuario');
        }
    };

    const handleEdit = async () => {
        try {
            const formData = new FormData();
            formData.append('idAdministrador', selectedUser.id_administrador); // Utiliza el ID del usuario seleccionado
            formData.append('nombreAdministrador', nombre);
            formData.append('apellidoAdministrador', apellido);
            formData.append('correoAdministrador', correo);
            // Agrega el resto de los campos que desees editar

            const response = await fetch(`http://${ip}/coffeeshop/api/services/admin/administrador.php?action=updateRow`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.status) {
                Alert.alert('Éxito', data.message);
                fetchUsuarios();
                setIsModalVisible(false);
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al editar el usuario');
        }
    };

    
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
                        onPress={() => openModal(user)}  // Abrir modal al presionar
                        onDelete={() => handleDelete(user.id_administrador)}  // Eliminar al presionar
                    />
                ))}
            </ScrollView>
            <ModalUser
                isVisible={isModalVisible}
                onClose={closeModal}
                onSubmit={handleEdit}
                nombre={nombre}
                setNombre={setNombre}
                apellido={apellido}
                setApellido={setApellido}
                correo={correo}
                setCorreo={setCorreo}
                alias={alias}
                setAlias={setAlias}
                clave={clave}
                setClave={setClave}
                confirmarClave={confirmarClave}
                setConfirmarClave={setConfirmarClave}
                modalType={modalType}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default VerScreen;
