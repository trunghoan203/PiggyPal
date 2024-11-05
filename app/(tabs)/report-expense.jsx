import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const ReportExpense = () => {
    const expenses = [
        { id: '1', category: 'Ăn uống', amount: '1,000,000 đ', date: '01 Thg 11, 2024', icon: 'cutlery' },
        { id: '2', category: 'Đi chơi', amount: '800,000 đ', date: '01 Thg 11, 2024', icon: 'smile-o' },
        { id: '3', category: 'Nước', amount: '500,000 đ', date: '01 Thg 11, 2024', icon: 'tint' },
    ];

    const chartData = [
        { name: 'Ăn uống', population: 30, color: '#FF6384', legendFontColor: '#333', legendFontSize: 12 },
        { name: 'Đi chơi', population: 15, color: '#36A2EB', legendFontColor: '#333', legendFontSize: 12 },
        { name: 'Nhà', population: 20, color: '#FFCE56', legendFontColor: '#333', legendFontSize: 12 },
        { name: 'Nợ', population: 5, color: '#4BC0C0', legendFontColor: '#333', legendFontSize: 12 },
        { name: 'Nước', population: 10, color: '#9966FF', legendFontColor: '#333', legendFontSize: 12 },
        { name: 'Mua sắm', population: 20, color: '#FF9F40', legendFontColor: '#333', legendFontSize: 12 },
    ];

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Tháng 11, 2024</Text>
                <View style={styles.calendar}>
                    {['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'].map((day, index) => (
                        <TouchableOpacity key={index} style={index === 2 ? styles.selectedDay : styles.calendarDay}>
                            <Text style={index === 2 ? styles.selectedDayText : styles.calendarText}>{day}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Expense List */}
            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.expenseItem}>
                        <FontAwesome name={item.icon} size={24} color="black" />
                        <View style={styles.expenseDetails}>
                            <Text style={styles.expenseCategory}>{item.category}</Text>
                            <Text style={styles.expenseDate}>{item.date}</Text>
                        </View>
                        <Text style={styles.expenseAmount}>{item.amount}</Text>
                    </View>
                )}
            />

            {/* Chart Section */}
            <Text style={styles.chartTitle}>Xếp hạng chi tiêu tháng 10</Text>
            <PieChart
                data={chartData}
                width={screenWidth - 40}
                height={200}
                chartConfig={{
                    backgroundColor: '#F5F5F5',
                    backgroundGradientFrom: '#F5F5F5',
                    backgroundGradientTo: '#F5F5F5',
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor={'population'}
                backgroundColor={'transparent'}
                paddingLeft={'15'}
                absolute
                style={styles.chart}
            />

            {/* Legend Section */}
            <View style={styles.legend}>
                {chartData.map((item, index) => (
                    <View key={index} style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                        <Text style={styles.legendText}>{item.name}</Text>
                        <Text style={styles.legendPercentage}>{item.population}%</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDE8E8',
        paddingHorizontal: 20,
    },
    header: {
        marginTop: 20,
        marginBottom: 10,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#B91C1C',
    },
    calendar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
    },
    calendarDay: {
        paddingHorizontal: 8,
        paddingVertical: 5,
    },
    selectedDay: {
        backgroundColor: '#B91C1C',
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 5,
    },
    calendarText: {
        fontSize: 16,
        color: '#B91C1C',
    },
    selectedDayText: {
        fontSize: 16,
        color: '#FFF',
    },
    expenseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomColor: '#DDD',
        borderBottomWidth: 1,
    },
    expenseDetails: {
        flex: 1,
        marginLeft: 10,
    },
    expenseCategory: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    expenseDate: {
        fontSize: 14,
        color: '#888',
    },
    expenseAmount: {
        fontSize: 16,
        color: '#B91C1C',
        fontWeight: 'bold',
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#B91C1C',
        marginVertical: 20,
        textAlign: 'center',
    },
    chart: {
        alignSelf: 'center',
    },
    legend: {
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    legendColor: {
        width: 15,
        height: 15,
        marginRight: 10,
        borderRadius: 3,
    },
    legendText: {
        flex: 1,
        fontSize: 14,
        color: '#333',
    },
    legendPercentage: {
        fontSize: 14,
        color: '#333',
    },
});

export default ReportExpense;
