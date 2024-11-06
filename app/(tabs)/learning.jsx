import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig'; // Ensure your Firebase config is correctly imported

export default function CourseLearning() {
    const [courses, setCourses] = useState([]); // State to hold the courses
    const router = useRouter();

    // Fetch courses from Firestore
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const coursesCollection = collection(db, 'Course'); // Reference to the Course collection
                const coursesSnapshot = await getDocs(coursesCollection);
                const coursesList = coursesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(), // Spread operator to get the course data
                }));

                setCourses(coursesList); // Update the state with the fetched courses
            } catch (error) {
                console.error("Error fetching courses: ", error);
            }
        };

        fetchCourses();
    }, []);

    const handleCoursePress = (courseId) => {
        router.push(`/course-detail?id=${courseId}`); // Assuming you want to navigate to a detailed view with the course ID
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
