import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from './../../constants/Colors';
import { StyleSheet, View } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.SECONDARY,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
            }}
        >
            <Tabs.Screen
                name='home'
                options={{
                    title: '',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={24} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name='report-expense'
                options={{
                    title: '',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="calendar" size={24} color={color} />
                    ),
                }}
            />

            {/* Custom Add Button in the Middle */}
            <Tabs.Screen
                name="add-expense"
                options={{
                    title: '',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <View style={styles.addButton}>
                            <Ionicons name="add" size={28} color="#fff" />
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name="learning"
                options={{
                    title: '',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="book" size={24} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: '',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="settings" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        height: 70,
        paddingBottom: 10,
        paddingTop: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#fff',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        elevation: 5,
    },
    addButton: {
        width: 60,
        height: 60,
        backgroundColor: Colors.SECONDARY,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20, // To position it above the tab bar slightly
        elevation: 5,
    },
});
