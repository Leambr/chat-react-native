import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import messages from './DATA/messages.json';
import { Message } from './components/Message';
import { CurrentUserProvider } from './core/CurrentUserContext';
import { Input } from './components/Input';

export default function App() {
    return (
        <CurrentUserProvider>
            <SafeAreaView style={styles.wrapper}>
                <StatusBar />
                <FlatList
                    data={messages}
                    renderItem={({ item }) => <Message textMessage={item} />}
                    keyExtractor={(item) => item.id}
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
