import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Colors from '../../constants/Colors';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const auth = getAuth();
    const user = auth.currentUser;
    const router = useRouter();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New password and confirmation do not match');
            return;
        }

        setLoading(true);

        try {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            Alert.alert('Success', 'Your password has been updated successfully.');
            router.replace('/profile');
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to update password');
            console.error('Password update error: ', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Đổi mật khẩu</Text>
                </View>

                {/* Password Fields */}
                <View style={styles.formContainer}>
                    {/* Current Password */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>MẬT KHẨU HIỆN TẠI</Text>
                        <View style={styles.passwordInput}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập mật khẩu hiện tại"
                                placeholderTextColor={Colors.BLACK}
                                secureTextEntry={!showCurrentPassword}
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                            />
                            <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                                <Ionicons name={showCurrentPassword ? 'eye-off' : 'eye'} size={24} color="grey" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* New Password */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>MẬT KHẨU MỚI</Text>
                        <View style={styles.passwordInput}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập mật khẩu mới"
                                placeholderTextColor={Colors.BLACK}
                                secureTextEntry={!showNewPassword}
                                value={newPassword}
                                onChangeText={setNewPassword}
                            />
                            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                                <Ionicons name={showNewPassword ? 'eye-off' : 'eye'} size={24} color="grey" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Confirm New Password */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>NHẬP LẠI MẬT KHẨU MỚI</Text>
                        <View style={styles.passwordInput}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập lại mật khẩu mới"
                                placeholderTextColor={Colors.BLACK}
                                secureTextEntry={!showConfirmPassword}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="grey" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Update Button */}
                <TouchableOpacity style={styles.updateButton} onPress={handleChangePassword} disabled={loading}>
                    {loading ? <ActivityIndicator size="small" color={Colors.WHITE} /> : <Text style={styles.updateButtonText}>Cập nhật</Text>}
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fceeee',
    },
    header: {
        paddingTop: 80,
        paddingBottom: 70,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        backgroundColor: Colors.SECONDARY,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    formContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    passwordInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: Colors.WHITE,
    },
    input: {
        flex: 1,
        height: 40,
    },
    updateButton: {
        backgroundColor: '#d21f3c',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20,
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
