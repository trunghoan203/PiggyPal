import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Linking, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useNavigation, useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router'; // For getting params from URL
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig'; // Ensure your Firebase config is correctly imported

export default function CourseDetail() {
    const router = useRouter();
    const { id } = useLocalSearchParams(); // Get course ID from URL params
    const [courseData, setCourseData] = useState(null); // State to hold the course data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    // Fetch course data from Firestore
    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const courseDoc = doc(db, 'Course', id); // Reference to the specific course document
                const courseSnapshot = await getDoc(courseDoc);

                if (courseSnapshot.exists()) {
                    setCourseData(courseSnapshot.data()); // Set the course data
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching course data: ", error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchCourseData();
    }, [id]);

    if (loading) {
        return <Text>Loading...</Text>; // Display loading text while fetching
    }

    if (!courseData) {
        return <Text>No course data available.</Text>; // Handle case where no course data is found
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#ff5f6d', '#d21f3c']} style={styles.header}>
                <Text style={styles.headerText}>Bài học</Text>

            </LinearGradient>

            <View style={styles.descriptionContainer}>
                <Text style={styles.courseTitle}>{`Bài ${id}: ${courseData.title}`}</Text>
                <Text style={styles.subHeader}>Video bài giảng:</Text>
                {courseData.linkytb && (
                    <TouchableOpacity onPress={() => Linking.openURL(courseData.linkytb)}>
                        <Text style={styles.videoLink}>{courseData.linkytb}</Text>
                    </TouchableOpacity>
                )}

                <Text style={styles.subHeader}>Mô tả chi tiết:</Text>
                <FlatList
                    data={courseData.description.split('. ')} // Assuming the description is a string with periods separating points
                    renderItem={({ item }) => (
                        <Text style={styles.detailItem}>• {item}</Text>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
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
        paddingTop: 80,
        paddingBottom: 70,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    courseTitle: {
        color: Colors.BLACK,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    descriptionContainer: {
        padding: 20,
    },
    descriptionText: {
        fontSize: 16,
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    detailItem: {
        fontSize: 16,
        marginLeft: 10,
    },
    videoLink: {
        color: Colors.SECONDARY,
        fontSize: 16,
        marginTop: 10,
        textDecorationLine: 'underline',
    },
});
