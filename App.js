import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';
import { Input } from './components/Input';
import { Message } from './components/Message';
import { CurrentUserProvider } from './core/CurrentUserContext';

export default function App() {
    const [allMessages, setAllMessages] = useState();

    const getStoredMessage = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('myAnswer');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (error) {
            console.error('Error storing data:', error);
        }
    };

    useEffect(() => {
        getStoredMessage().then((retrievedMessages) => {
            if (retrievedMessages) {
                setAllMessages(retrievedMessages);
            }
        });
    }, [allMessages]);

    return (
        <CurrentUserProvider>
            <SafeAreaView style={styles.wrapper}>
                <StatusBar />
                <FlatList
                    data={allMessages}
                    renderItem={({ item }) => <Message textMessage={item} />}
                    keyExtractor={() => uuid.v4()}
                />
                <Input />
            </SafeAreaView>
        </CurrentUserProvider>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'start',
        justifyContent: 'start',
    },
    subWrapper: {
        flex: 5,
    },
    subWrapperSm: {
        flex: 1,
    },
    input: {
        width: '100%',
        justifyContent: 'end',
    },
});
