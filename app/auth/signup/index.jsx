import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert, ToastAndroid } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import Colors from '../../../constants/Colors';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../../config/FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import ExpoCheckbox from 'expo-checkbox/build/ExpoCheckbox';

export default function SignIn() {
    const navigation = useNavigation();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    }, []);

    const OnCreateAccount = async () => {
        if (!email || !password || !fullName) {
            const message = 'Please enter all details';
            Platform.OS === 'android' ? ToastAndroid.show(message, ToastAndroid.LONG) : Alert.alert('Error', message);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: fullName });

            // Add user data to Firestore
            await setDoc(doc(db, "User", user.uid), {
                fullName: fullName,
                userEmail: email,
                isUser: 1,
            });

            router.replace('/auth/signin');
        } catch (error) {
            const errorMessage = error.message;
            Platform.OS === 'android' ? ToastAndroid.show(errorMessage, ToastAndroid.LONG) : Alert.alert('Sign-Up Error', errorMessage);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <LinearGradient
                    colors={['#ff5f6d', '#d21f3c']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                >
                    <Text style={styles.buttonText}>Đăng ký</Text>
                </LinearGradient>
            </View>

            <View style={styles.bodyContainer}>
                <Text style={styles.label}>ĐỊA CHỈ EMAIL</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập email của bạn"
                    keyboardType='email-address'
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />

                <Text style={styles.label}>HỌ VÀ TÊN</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập họ và tên của bạn"
                    value={fullName}
                    onChangeText={setFullName}
                />

                <Text style={styles.label}>MẬT KHẨU</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập mật khẩu của bạn"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <Text style={styles.label}>NHẬP LẠI MẬT KHẨU</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập mật khẩu của bạn"
                    secureTextEntry={true}

                />

                <View style={styles.checkboxContainer}>
                    <ExpoCheckbox
                        value={isChecked}
                        onValueChange={setIsChecked}
                        tintColors={{ true: '#d21f3c', false: '#ccc' }}
                    />
                    <Text style={styles.checkboxLabel}>Tôi đồng ý với Chính sách bảo mật dữ liệu</Text>
                </View>

                <TouchableOpacity onPress={OnCreateAccount} style={styles.signupButton}>
                    <Text style={styles.buttonSignupText}>Đăng ký</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("/auth/signin")}>
                    <Text style={styles.loginText}>Nếu bạn đã có tài khoản? <Text style={styles.loginSubText}>  Đăng nhập</Text></Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY,
    },
    buttonContainer: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
        width: '100%',
    },
    gradient: {
        paddingVertical: 80,
        paddingHorizontal: 20,
        alignItems: 'left',
    },
    buttonText: {
        color: Colors.WHITE,
        fontFamily: "outfit-bold",
        fontSize: 25,
    },
    bodyContainer: {
        padding: 20
    },
    label: {
        fontFamily: "outfit-medium",
        fontSize: 12,
        marginTop: 10
    },
    input: {
        fontFamily: "outfit",
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginTop: 5
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    checkboxLabel: {
        fontFamily: "outfit-medium",
        marginLeft: 10
    },
    buttonSignupText: {
        fontFamily: "outfit-bold",
        fontSize: 16,
        color: Colors.WHITE,
        fontWeight: 'bold'
    },
    signupButton: {
        backgroundColor: Colors.SECONDARY,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20
    },
    loginText: {
        fontFamily: "outfit-medium",
        fontSize: 14,
        textAlign: 'center',
        marginTop: 20
    },
    loginSubText: {
        fontFamily: "outfit-bold",
        fontSize: 14,
        textAlign: 'center',
        color: Colors.SECONDARY,
        marginTop: 20
    },
});