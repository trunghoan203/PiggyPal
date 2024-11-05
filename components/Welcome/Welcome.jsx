import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function Login() {
    const router = useRouter();

    // Data array with a single item to enable FlatList functionality
    const data = [{ key: '1' }];

    const renderItem = () => (
        <View>
            <Image
                source={require('../../assets/images/Logo.png')}
                style={styles.image}
            />
            <View style={styles.container}>
                <Text style={styles.title}>
                    Chào mừng bạn đến với PiggyPal?
                </Text>
                <Text style={styles.subtitle}>
                    Hãy khám phá thế giới PiggyPal nơi bạn có  thể quản lý chi tiêu và học được nhiều bài học về thu chi nhé!
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push('auth/signin')}
                >
                    <Text style={styles.buttonText}>
                        Get Started
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            contentContainerStyle={styles.flatListContent}
        />
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 450,
    },
    container: {
        backgroundColor: Colors.PRIMARY,
        paddingTop: 20,
        height: '100%',
        padding: 15,
        paddingBottom: 50,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 17,
        textAlign: 'center',
        marginTop: 20,
    },
    button: {
        padding: 15,
        backgroundColor: Colors.SECONDARY,
        borderRadius: 99,
        marginTop: '20%',
    },
    buttonText: {
        color: Colors.WHITE,
        textAlign: "center",
        fontSize: 20,
    },
    flatListContent: {
        flexGrow: 1,
    },
});
