import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

const courses = [
    { id: '1', title: 'Giới thiệu về Tài chính cá nhân' },
    { id: '2', title: 'Lập kế hoạch tài chính cá nhân' },
    { id: '3', title: 'Quản lý thu nhập và chi tiêu' },
    { id: '4', title: 'Tiết kiệm và Quỹ dự phòng' },
    { id: '5', title: 'Quản lý nợ và sử dụng tín dụng' },
];

export default function CourseLearning() {
    const router = useRouter();

    const handleCoursePress = (courseId) => {
        router.push(`/course/${courseId}`);
    };

    const renderCourseItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleCoursePress(item.id)} style={styles.courseItem}>
            <View style={styles.courseNumber}>
                <Text style={styles.courseNumberText}>{item.id}</Text>
            </View>
            <Text style={styles.courseTitle}>{item.title}</Text>
            <Ionicons name="play-circle-outline" size={24} color={Colors.SECONDARY} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <LinearGradient colors={['#ff5f6d', '#d21f3c']} style={styles.header}>
                <Text style={styles.headerText}>Bài học</Text>
                <Image
                    source={{ uri: 'https://example.com/piggy-icon.png' }} // Replace with the actual URL or local asset for the piggy icon
                    style={styles.piggyIcon}
                />
                <Image
                    source={{ uri: 'https://example.com/abc-icon.png' }} // Replace with the actual URL or local asset for the ABC icon
                    style={styles.abcIcon}
                />
            </LinearGradient>

            {/* Course List */}
            <FlatList
                data={courses}
                renderItem={renderCourseItem}
                keyExtractor={(item) => item.id}
                style={styles.courseList}
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
        padding: 20,
        paddingBottom: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    piggyIcon: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: 20,
        right: 40,
    },
    abcIcon: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: 20,
        left: 40,
    },
    courseList: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    courseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        elevation: 3,
    },
    courseNumber: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.SECONDARY,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    courseNumberText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    courseTitle: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
});
