import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';

export default function Profile() {
    const router = useRouter();
    const auth = getAuth();
    const user = auth.currentUser;

    // Sample usage data for the week (Replace with actual data if available)
    const usageData = [
        { day: 'T2', value: 3 },
        { day: 'T3', value: 4 },
        { day: 'T4', value: 2 },
        { day: 'T5', value: 5 },
        { day: 'T6', value: 3 },
        { day: 'T7', value: 4 },
        { day: 'CN', value: 6 },
    ];

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                router.replace('/login');
            })
            .catch(error => {
                Alert.alert("Error", error.message);
            });
    };

    const handleProfileDetail = () => {
        router.push('/profile/detail'); // Navigate to the profile detail page
    };

    const handleChangePassword = () => {
        router.push('/profile/change-password'); // Navigate to change password page
    };

    const renderUsageBar = ({ item }) => (
        <View style={styles.usageBarContainer}>
            <View style={[styles.usageBar, { height: item.value * 10 }]} />
            <Text style={styles.usageBarLabel}>{item.day}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <LinearGradient colors={['#ff5f6d', '#d21f3c']} style={styles.header}>
                <Text style={styles.headerText}>Cá nhân</Text>
            </LinearGradient>

            {/* Profile Info */}
            <View style={styles.profileInfoContainer}>
                <Image
                    source={user?.photoURL ? { uri: user.photoURL } : require('../../assets/avatar-placeholder.png')} // Replace with local placeholder if user.photoURL is unavailable
                    style={styles.avatar}
                />
                <Text style={styles.profileName}>{user?.displayName || "Name"}</Text>
                <Text style={styles.profileEmail}>{user?.email || "example@gmail.com"}</Text>

                {/* Usage Graph */}
                <FlatList
                    data={usageData}
                    renderItem={renderUsageBar}
                    keyExtractor={(item) => item.day}
                    horizontal
                    style={styles.usageGraph}
                />

                {/* Usage Message */}
                <View style={styles.usageMessageContainer}>
                    <Text style={styles.usageMessageText}>Hôm nay, bạn sử dụng hết...</Text>
                </View>
            </View>

            {/* Settings List */}
            <View style={styles.settingsList}>
                <TouchableOpacity style={styles.settingsItem} onPress={handleProfileDetail}>
                    <Ionicons name="person-outline" size={24} color={Colors.SECONDARY} />
                    <Text style={styles.settingsText}>Thông tin cá nhân</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsItem} onPress={handleChangePassword}>
                    <Ionicons name="lock-closed-outline" size={24} color={Colors.SECONDARY} />
                    <Text style={styles.settingsText}>Mật khẩu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsItem}>
                    <Ionicons name="game-controller-outline" size={24} color={Colors.SECONDARY} />
                    <Text style={styles.settingsText}>Trò chơi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsItem}>
                    <Ionicons name="language-outline" size={24} color={Colors.SECONDARY} />
                    <Text style={styles.settingsText}>Ngôn ngữ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsItem}>
                    <Ionicons name="cash-outline" size={24} color={Colors.SECONDARY} />
                    <Text style={styles.settingsText}>Đơn vị tiền tệ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsItem}>
                    <Ionicons name="help-outline" size={24} color={Colors.SECONDARY} />
                    <Text style={styles.settingsText}>Báo lỗi hoặc phản hồi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsItem}>
                    <Ionicons name="star-outline" size={24} color={Colors.SECONDARY} />
                    <Text style={styles.settingsText}>Đánh giá</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsItem} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={24} color={Colors.SECONDARY} />
                    <Text style={styles.settingsText}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fceeee',
    },
    header: {
        padding: 20,
        paddingBottom: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    profileInfoContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#fff',
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    profileEmail: {
        fontSize: 14,
        color: '#888',
    },
    usageGraph: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    usageBarContainer: {
        alignItems: 'center',
        marginHorizontal: 5,
    },
    usageBar: {
        width: 8,
        backgroundColor: Colors.SECONDARY,
        borderRadius: 4,
    },
    usageBarLabel: {
        marginTop: 5,
        fontSize: 12,
        color: '#888',
    },
    usageMessageContainer: {
        backgroundColor: Colors.SECONDARY,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginVertical: 10,
    },
    usageMessageText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
    settingsList: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    settingsText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 15,
    },
});
