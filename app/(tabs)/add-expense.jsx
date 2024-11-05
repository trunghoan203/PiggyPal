import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const categories = {
    expenses: [
        { id: '1', icon: 'fast-food-outline', label: 'Ăn uống' },
        { id: '2', icon: 'cart-outline', label: 'Mua sắm' },
        { id: '3', icon: 'flash-outline', label: 'Điện' },
        { id: '4', icon: 'water-outline', label: 'Nước' },
        { id: '5', icon: 'home-outline', label: 'Nhà' },
        { id: '6', icon: 'barbell-outline', label: 'Thể dục' },
        { id: '7', icon: 'book-outline', label: 'Sách vở' },
        { id: '8', icon: 'create-outline', label: 'Học tập' },
        { id: '9', icon: 'cash-outline', label: 'Nợ' },
        { id: '10', icon: 'happy-outline', label: 'Giải trí' },
        { id: '11', icon: 'game-controller-outline', label: 'Trò chơi' },
        { id: '12', icon: 'medkit-outline', label: 'Sức khỏe' },
        { id: '13', icon: 'add-outline', label: 'Thêm' },
    ],
    income: [
        { id: '1', icon: 'wallet-outline', label: 'Lương' },
        { id: '2', icon: 'trophy-outline', label: 'Thưởng' },
        { id: '3', icon: 'gift-outline', label: 'Quà' },
        { id: '4', icon: 'add-outline', label: 'Thêm' },
    ],
};

export default function AddExpense() {
    const [selectedTab, setSelectedTab] = useState('expenses');

    const renderCategoryItem = ({ item }) => (
        <View style={styles.categoryItem}>
            <Ionicons name={item.icon} size={30} color="#e7c300" style={styles.categoryIcon} />
            <Text style={styles.categoryLabel}>{item.label}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <LinearGradient colors={['#ff5f6d', '#d21f3c']} style={styles.header}>
                <Text style={styles.headerText}>Thêm giao dịch</Text>
            </LinearGradient>

            {/* Tabs */}
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

            {/* Category Grid */}
            <FlatList
                data={selectedTab === 'expenses' ? categories.expenses : categories.income}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id}
                numColumns={4}
                style={styles.categoryList}
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
        padding: 20,
        paddingBottom: 50,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
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
        borderRadius: 15,
        marginBottom: 5,
        elevation: 3,
    },
    categoryLabel: {
        fontSize: 12,
        textAlign: 'center',
        color: '#555',
    },
});
