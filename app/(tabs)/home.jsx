import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import DefaultAvatar from '../../components/UserAvt/DefaultAvatar';
import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);

  const router = useRouter();

  // Sample data for transactions
  const transactions = [
    { id: '1', icon: 'cash-outline', category: 'Nợ', date: '01 Thg 11, 2024', amount: '500.000 đ' },
    { id: '2', icon: 'cart-outline', category: 'Mua sắm', date: '01 Thg 11, 2024', amount: '1.000.000 đ' },
    { id: '3', icon: 'home-outline', category: 'Nhà', date: '01 Thg 11, 2024', amount: '2.500.000 đ' },
  ];

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    setUser(currentUser);
  }, []);

  const navigateToProfile = () => {
    router.push('/profile');
  };

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <Ionicons name={item.icon} size={30} color={item.color} style={styles.transactionIcon} />
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionCategory}>{item.category}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <Text style={styles.transactionAmount}>{item.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Greeting */}
      <LinearGradient colors={['#ff5f6d', '#d21f3c']} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={navigateToProfile} style={styles.avatarContainer}>
            {user?.photoURL ? (
              <Image
                source={{ uri: user.photoURL }}
                style={styles.avatar}
              />
            ) : (
              <DefaultAvatar name={user?.displayName || "User"} size={50} />
            )}
          </TouchableOpacity>
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Chào buổi sáng,</Text>
            <Text style={styles.userName}>{user?.displayName || "Name"}</Text>
          </View>
        </View>
        {/* <Image
          source={{ uri: './../../assets/images/Logo.png' }}
          style={styles.emoji}
        /> */}
      </LinearGradient>

      {/* Income and Expense Cards */}
      <View style={styles.cardContainer}>
        <LinearGradient colors={['#ff5f6d', '#d21f3c']} style={styles.card}>
          <Ionicons name="arrow-up-circle" size={24} color="#ffd700" />
          <Text style={styles.cardTitle}>Thu nhập</Text>
          <Text style={styles.cardAmount}>10.000.000 đ</Text>
        </LinearGradient>
        <LinearGradient colors={['#ff5f6d', '#d21f3c']} style={styles.card}>
          <Ionicons name="arrow-down-circle" size={24} color="#ffd700" />
          <Text style={styles.cardTitle}>Chi tiêu</Text>
          <Text style={styles.cardAmount}>5.000.000 đ</Text>
        </LinearGradient>
      </View>

      {/* Transaction List */}
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        style={styles.transactionList}
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
    paddingTop: 60,
    padding: 20,
    paddingBottom: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  greetingContainer: {
    flexDirection: 'column',
  },
  greetingText: {
    color: '#fff',
    fontSize: 16,
  },
  userName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  emoji: {
    width: 80,
    height: 80,
    position: 'absolute',
    bottom: -20,
    right: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  card: {
    width: '45%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  cardAmount: {
    color: '#fff',
    fontSize: 18,
    marginTop: 5,
  },
  transactionList: {
    paddingHorizontal: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionIcon: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 10,
    marginRight: 10,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionCategory: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDate: {
    fontSize: 14,
    color: '#888',
  },
  transactionAmount: {
    fontSize: 16,
    color: Colors.SECONDARY,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: Colors.SECONDARY,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },
});
