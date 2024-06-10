import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ModalUser = ({
    isVisible,
    onClose,
    onSubmit,
    nombre,
    setNombre,
    apellido,
    setApellido,
    correo,
    setCorreo,
    alias,
    setAlias,
    clave,
    setClave,
    confirmarClave,
    setConfirmarClave,
    modalType
}) => {
    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{modalType === 'edit' ? 'Editar Usuario' : 'Eliminar Usuario'}</Text>

                    <TextInput
                        placeholder="Nombre"
                        value={nombre}
                        onChangeText={setNombre}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Apellido"
                        value={apellido}
                        onChangeText={setApellido}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Correo"
                        value={correo}
                        onChangeText={setCorreo}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Alias"
                        value={alias}
                        onChangeText={setAlias}
                        style={styles.input}
                    />
                    {modalType === 'edit' && (
                        <>
                            <TextInput
                                placeholder="Clave"
                                value={clave}
                                onChangeText={setClave}
                                style={styles.input}
                                secureTextEntry={true}
                            />
                            <TextInput
                                placeholder="Confirmar Clave"
                                value={confirmarClave}
                                onChangeText={setConfirmarClave}
                                style={styles.input}
                                secureTextEntry={true}
                            />
                        </>
                    )}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={onClose}
                            style={[styles.button, { backgroundColor: 'red' }]}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onSubmit}
                            style={[styles.button, { backgroundColor: 'green' }]}
                        >
                            <Text style={styles.buttonText}>{modalType === 'edit' ? 'Guardar' : 'Eliminar'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
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

export default ModalUser;
