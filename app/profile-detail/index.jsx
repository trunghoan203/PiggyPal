import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import Colors from '../../constants/Colors';
import { router, useNavigation } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import DefaultAvatar from '../../components/UserAvt/DefaultAvatar';

export default function ProfileDetail() {
    const auth = getAuth();
    const user = auth.currentUser;
    const navigation = useNavigation();

    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
    });

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    }, []);

    // Fetch user data from Firestore
    const fetchUserData = async () => {
        try {
            setLoading(true);
            const userDoc = await getDoc(doc(db, 'User', user.uid));
            if (userDoc.exists()) {
                setUserData(userDoc.data());
            } else {
                Alert.alert('Error', 'User data not found');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to load user data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    // Handle updating user profile in Firestore
    const handleUpdateProfile = async () => {
        try {
            setUpdating(true);
            await updateDoc(doc(db, 'User', user.uid), userData);
            Alert.alert('Success', 'Profile updated successfully');
            router.replace("/profile");
        } catch (error) {
            Alert.alert('Error', 'Failed to update profile');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
            </View>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {/* Header */}
                <LinearGradient colors={['#ff5f6d', '#d21f3c']} style={styles.header}>
                    <Text style={styles.headerText}>Thông tin các nhân</Text>
                </LinearGradient>

                {/* Avatar Placeholder */}
                <View style={styles.avatarContainer}>
                    {user?.photoURL ? (
                        <Image
                            source={{ uri: user.photoURL }}
                            style={styles.avatar}
                        />
                    ) : (
                        <DefaultAvatar name={user?.displayName || "User"} size={70} />
                    )}
                </View>
                <View style={styles.cardContainer}>
                    {/* Email Field (Non-editable) */}
                    <Text style={styles.label}>EMAIL</Text>
                    <TextInput
                        style={styles.input}
                        value={userData.userEmail}
                        editable={false}
                    />

                    {/* Full Name Field */}
                    <Text style={styles.label}>HỌ VÀ TÊN</Text>
                    <TextInput
                        style={styles.input}
                        value={userData.fullName}
                        onChangeText={(text) => setUserData({ ...userData, fullName: text })}
                    />

                    <Text style={styles.label}>SỐ ĐIỆN THOẠI</Text>
                    <TextInput
                        style={styles.input}
                        value={userData.phone}
                        keyboardType="phone-pad"
                        onChangeText={(text) => setUserData({ ...userData, phone: text })}
                    />

                    <Text style={styles.label}>ĐỊA CHỈ</Text>
                    <TextInput
                        style={styles.input}
                        value={userData.address}
                        onChangeText={(text) => setUserData({ ...userData, address: text })}
                    />

                    {/* Update Button */}
                    <TouchableOpacity
                        style={styles.updateButton}
                        onPress={handleUpdateProfile}
                        disabled={updating}
                    >
                        {updating ? (
                            <ActivityIndicator size="small" color={Colors.WHITE} />
                        ) : (
                            <Text style={styles.updateButtonText}>Cập nhật</Text>
                        )}
                    </TouchableOpacity>

                    {/* Delete Account Button */}
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => Alert.alert("Confirm", "Are you sure you want to delete your account?", [
                            { text: "Cancel", style: "cancel" },
                            { text: "Delete", onPress: () => console.log("Account deleted") }
                        ])}
                    >
                        <Text style={styles.deleteButtonText}>Xóa tài khoản</Text>
                    </TouchableOpacity>
                </View>
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
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    avatarPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.WHITE,
    },
    avatarLabel: {
        fontSize: 14,
        marginTop: 10,
    },
    label: {
        fontSize: 12,
        marginTop: 20,
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.GRAY,
        borderRadius: 5,
        marginTop: 5,
        backgroundColor: Colors.WHITE,
    },
    disabledInput: {
        backgroundColor: '#f0f0f0',
    },
    editableFieldContainer: {
        marginTop: 10,
    },
    editableInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editButton: {
        marginLeft: 10,
        color: Colors.PRIMARY,
        fontWeight: 'bold',
    },
    updateButton: {
        backgroundColor: '#d21f3c',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 30,
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        borderWidth: 1,
        borderColor: '#d21f3c',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    deleteButtonText: {
        color: '#d21f3c',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
