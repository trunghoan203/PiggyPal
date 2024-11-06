import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';

export default function Profile() {
    const router = useRouter();
    const auth = getAuth();
    const user = auth.currentUser;


    const confirmLogout = () => {
        Alert.alert(
            "Xác nhận đăng xuất",
            "Bạn chắc chắn muốn đăng xuất?",
            [
                {
                    text: "Không",
                    style: "cancel"
                },
                {
                    text: "Có",
                    onPress: handleLogout
                }
            ],
            { cancelable: true }
        );
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                router.replace('/auth/signin');
            })
            .catch(error => {
                Alert.alert("Error", error.message);
            });
    };

    const settingsOptions = [
        { id: 'profileDetail', icon: 'person-outline', label: 'Thông tin cá nhân', action: () => router.push('/profile-detail') },
        { id: 'changePassword', icon: 'lock-closed-outline', label: 'Mật khẩu', action: () => router.push('/change-password') },
        { id: 'game', icon: 'game-controller-outline', label: 'Trò chơi' },
        { id: 'language', icon: 'language-outline', label: 'Ngôn ngữ' },
        { id: 'currency', icon: 'cash-outline', label: 'Đơn vị tiền tệ' },
        { id: 'feedback', icon: 'help-outline', label: 'Báo lỗi hoặc phản hồi' },
        { id: 'rate', icon: 'star-outline', label: 'Đánh giá' },
        { id: 'logout', icon: 'log-out-outline', label: 'Đăng xuất', action: confirmLogout },
    ];

    const renderUsageBar = ({ item }) => (
        <View style={styles.usageBarContainer}>
            <View style={[styles.usageBar, { height: item.value * 10 }]} />
            <Text style={styles.usageBarLabel}>{item.day}</Text>
        </View>
    );

    const renderSettingItem = ({ item }) => (
        <TouchableOpacity style={styles.settingsItem} onPress={item.action}>
            <Ionicons name={item.icon} size={24} color={Colors.SECONDARY} />
            <Text style={styles.settingsText}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <LinearGradient colors={['#ff5f6d', '#d21f3c']} style={styles.header}>
                <Text style={styles.headerText}>Cá nhân</Text>
            </LinearGradient>

            {/* Profile Info */}
            <View style={styles.profileInfoContainer}>
                {/* Profile Information */}
                <Text style={styles.profileName}>{user?.displayName || "Name"}</Text>
                <Text style={styles.profileEmail}>{user?.email || "example@gmail.com"}</Text>

                {/* Usage Graph */}
                {/* <FlatList
                            data={usageData}
                            renderItem={renderUsageBar}
                            keyExtractor={(item) => item.day}
                            horizontal
                            style={styles.usageGraph}
                            showsHorizontalScrollIndicator={false}
                        /> */}

                {/* Usage Message */}
                {/* <View style={styles.usageMessageContainer}>
                            <Text style={styles.usageMessageText}>Hôm nay, bạn sử dụng hết...</Text>
                        </View> */}
            </View>
            <FlatList
                data={settingsOptions}
                renderItem={renderSettingItem}
                keyExtractor={(item) => item.id}
                style={styles.settingsList}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fceeee',
    },
    header: {
        paddingTop: 80,
        paddingBottom: 60,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 30,
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
        marginTop: 10,
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
    footerSpacing: {
        height: 100, // Adds space at the bottom so that the last item is above the tab layout
    },
});
