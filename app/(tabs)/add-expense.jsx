import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../config/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'expo-router';

export default function AddExpense() {
    const [selectedTab, setSelectedTab] = useState('expenses');
    const [categories, setCategories] = useState({ expenses: [], income: [] });
    const router = useRouter();

    // Fetch categories from Firebase
    useEffect(() => {
        const fetchCategories = async () => {
            const expensesSnapshot = await getDocs(collection(db, 'expenses'));
            const incomeSnapshot = await getDocs(collection(db, 'income'));

            const expenses = expensesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const income = incomeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            setCategories({ expenses, income });
        };

        fetchCategories();
    }, []);

    // Render each category item
    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => {
                router.push({
                    pathname: '/add-transaction',
                    params: { category: item, type: selectedTab },
                });
            }}
        >
            <View style={[styles.categoryIcon, Platform.OS === 'ios' && styles.categoryIconIOS]}>
                <Ionicons name={item.icon} size={30} color="#e7c300" />
            </View>
            <Text style={styles.categoryLabel}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#ff5f6d', '#d21f3c']} style={styles.header}>
                <Text style={styles.headerText}>Thêm giao dịch</Text>
            </LinearGradient>

            <View style={styles.tabsContainer}>
                <TouchableOpacity onPress={() => setSelectedTab('expenses')} style={styles.tab}>
                    <Text style={[styles.tabText, selectedTab === 'expenses' && styles.tabTextActive]}>Chi tiêu</Text>
                    {selectedTab === 'expenses' && <View style={styles.tabIndicator} />}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedTab('income')} style={styles.tab}>
                    <Text style={[styles.tabText, selectedTab === 'income' && styles.tabTextActive]}>Thu nhập</Text>
                    {selectedTab === 'income' && <View style={styles.tabIndicator} />}
                </TouchableOpacity>
            </View>

            <FlatList
                data={selectedTab === 'expenses' ? categories.expenses : categories.income}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id}
                numColumns={4}
                contentContainerStyle={styles.categoryList}
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
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    tab: {
        marginHorizontal: 15,
        alignItems: 'center',
    },
    tabText: {
        fontSize: 16,
        color: Colors.SECONDARY,
    },
    tabTextActive: {
        color: Colors.SECONDARY,
        fontWeight: 'bold',
    },
    tabIndicator: {
        width: '100%',
        height: 2,
        backgroundColor: Colors.SECONDARY,
        marginTop: 5,
    },
    categoryList: {
        paddingHorizontal: 20,
    },
    categoryItem: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 15,
    },
    categoryIcon: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 5,
        elevation: 3,
        ...Platform.select({
            ios: {
                borderRadius: 15,
            },
            android: {
                borderRadius: 15,
            },
        }),
    },
    categoryIconIOS: {
        borderRadius: 15,
    },
    categoryLabel: {
        fontSize: 12,
        textAlign: 'center',
        color: '#555',
    },
});
