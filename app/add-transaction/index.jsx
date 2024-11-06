import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db } from '../../config/FirebaseConfig';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function AddTransaction() {
    const { category, type } = useLocalSearchParams();
    const [amount, setAmount] = useState('');
    const [details, setDetails] = useState('');
    const [date, setDate] = useState(new Date());
    const [tempDate, setTempDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const router = useRouter();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const handleAddTransaction = async () => {
        if (!category || !type) {
            Alert.alert("Lỗi", "Thông tin danh mục hoặc loại giao dịch không hợp lệ.");
            return;
        }

        if (!amount) {
            Alert.alert("Lỗi", "Vui lòng nhập số tiền.");
            return;
        }

        try {
            const collectionName = type === 'expenses' ? 'expenseTransactions' : 'incomeTransactions';
            await addDoc(collection(db, collectionName), {
                category: category.label || "Chưa xác định",
                amount: parseFloat(amount),
                details,
                date: Timestamp.fromDate(date),
            });

            Alert.alert("Thành công", "Giao dịch đã được thêm thành công.");
            router.back();
        } catch (error) {
            console.error("Error adding transaction:", error);
            Alert.alert("Lỗi", "Không thể thêm giao dịch.");
        }
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || tempDate;
        setTempDate(currentDate);
    };

    const confirmDate = () => {
        setDate(tempDate);
        setShowDatePicker(false);
    };

    const cancelDate = () => {
        setTempDate(date);
        setShowDatePicker(false);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <LinearGradient
                    colors={['#ff5f6d', '#d21f3c']}
                    style={styles.headerContainer}
                >
                    <Text style={styles.headerText}>
                        {type === 'expenses' ? 'Thêm chi tiêu' : 'Thêm thu nhập'}
                    </Text>
                </LinearGradient>
                <View style={styles.body}>
                    <Text style={styles.label}>{type === 'expenses' ? 'Số tiền chi tiêu' : 'Số tiền thu nhập'}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={type === 'expenses' ? 'Nhập số tiền chi tiêu' : 'Nhập số tiền thu nhập'}
                        placeholderTextColor={Colors.BLACK}
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />

                    <Text style={styles.label}>Ngày</Text>
                    <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        style={styles.datePickerButton}
                    >
                        <Text style={styles.datePickerText}>{date.toLocaleDateString()}</Text>
                        <Ionicons name="calendar-outline" size={20} color={Colors.BLACK} />
                    </TouchableOpacity>

                    {showDatePicker && (
                        <View style={styles.datePickerContainer}>
                            {/* Cancel and OK Buttons */}
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={cancelDate} style={styles.cancelButton}>
                                    <Text style={styles.buttonText}>Bỏ qua</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={confirmDate} style={styles.okButton}>
                                    <Text style={styles.buttonText}>OK</Text>
                                </TouchableOpacity>
                            </View>
                            <DateTimePicker
                                value={tempDate}
                                mode="date"
                                display="spinner"
                                onChange={handleDateChange}
                                style={Platform.OS === 'ios' ? styles.dateTimePickerIOS : undefined}
                                textColor="#000000"
                            />
                        </View>
                    )}

                    <Text style={styles.label}>Chi tiết</Text>
                    <TextInput
                        style={[styles.input, styles.multiLineInput]}
                        placeholder="Nhập chi tiết"
                        placeholderTextColor={Colors.BLACK}
                        value={details}
                        onChangeText={setDetails}
                        multiline
                        numberOfLines={4}
                    />

                    <TouchableOpacity style={styles.addButton} onPress={handleAddTransaction}>
                        <Text style={styles.addButtonText}>Thêm giao dịch</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fceeee',
    },
    headerContainer: {
        paddingTop: 80,
        paddingBottom: 70,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
    },
    body: {
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    headerIcon: {
        marginRight: 10,
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        color: Colors.BLACK,
        marginTop: 10,
    },
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: Colors.GRAY,
        borderRadius: 5,
        marginTop: 5,
        backgroundColor: Colors.WHITE,
    },
    multiLineInput: {
        height: 80,
        textAlignVertical: 'top',
    },
    datePickerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.GRAY,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginTop: 5,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    datePickerText: {
        fontSize: 16,
        color: Colors.BLACK,
    },
    datePickerContainer: {
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
    },
    dateTimePickerIOS: {
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    cancelButton: {
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
    },
    okButton: {
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.SECONDARY,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: Colors.SECONDARY,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
