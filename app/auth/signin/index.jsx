import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert, ToastAndroid } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ExpoCheckbox from 'expo-checkbox/build/ExpoCheckbox';
import { useNavigation, useRouter } from 'expo-router';
import Colors from '../../../constants/Colors';
import { auth } from '../../../config/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignIn() {
    const navigation = useNavigation();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    }, []);

    const onSignIn = () => {
        if (!email || !password) {
            const message = 'Please enter all details';
            Platform.OS === 'android' ? ToastAndroid.show(message, ToastAndroid.LONG) : Alert.alert('Error', message);
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                router.replace('/home'); // Redirect to HomePgae
            })
            .catch((error) => {
                let errorMessage;
                if (error.code === 'auth/user-not-found') {
                    errorMessage = 'Wrong email!!!';
                } else if (error.code === 'auth/wrong-password') {
                    errorMessage = 'Wrong Password!!!';
                } else {
                    errorMessage = error.message;
                }

                if (Platform.OS === 'android') {
                    ToastAndroid.show(errorMessage, ToastAndroid.LONG);
                } else {
                    Alert.alert('Sign-In Error', errorMessage);
                }
            });
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
                    <Text style={styles.buttonText}>Đăng nhập</Text>
                </LinearGradient>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.label}>ĐỊA CHỈ EMAIL</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập email của bạn"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>MẬT KHẨU</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập mật khẩu của bạn"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <View style={styles.checkboxContainer}>
                    <ExpoCheckbox
                        value={isChecked}
                        onValueChange={setIsChecked}
                        tintColors={{ true: '#d21f3c', false: '#ccc' }}
                    />
                    <Text style={styles.checkboxLabel}>Lưu tài khoản trên thiết bị</Text>
                </View>

                <TouchableOpacity onPress={onSignIn} style={styles.loginButton}>
                    <Text style={styles.buttonLoginText}>Đăng nhập</Text>
                </TouchableOpacity>

                <Text style={styles.orText}>Hoặc đăng nhập</Text>

                <TouchableOpacity style={styles.socialButton}>
                    <Text style={styles.socialText}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton}>
                    <Text style={styles.socialText}>Apple</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("/auth/signup")}>
                    <Text style={styles.signupText}>
                        Nếu bạn chưa có tài khoản?
                        <Text style={styles.signupSubText}>  Đăng ký</Text>
                    </Text>
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
    loginButton: {
        backgroundColor: Colors.SECONDARY,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20
    },
    buttonLoginText: {
        fontFamily: "outfit-bold",
        fontSize: 16,
        color: Colors.WHITE,
        fontWeight: 'bold'
    },
    orText: {
        fontFamily: "outfit",
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 10,
    },
    socialButton: {
        backgroundColor: Colors.GRAY,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 5
    },
    socialText: {
        fontFamily: "outfit-medium",
        fontSize: 18,
    },
    signupText: {
        fontFamily: "outfit-medium",
        fontSize: 14,
        textAlign: 'center',
        marginTop: 20
    },
    signupSubText: {
        fontFamily: "outfit-bold",
        fontSize: 14,
        textAlign: 'center',
        color: Colors.SECONDARY,
        marginTop: 20
    },
});
