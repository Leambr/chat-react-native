import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import {
    Button,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import messages from '../DATA/messages.json';
import { useCurrentUser } from '../core/CurrentUserContext';

export const Input = () => {
    const [messageValue, setMessageValue] = useState();
    const [storedMessages, setStoredMessages] = useState(messages);
    const { currentUser } = useCurrentUser();

    const storeMessage = async () => {
        console.log('store', storedMessages.length);
        try {
            const newMessage = {
                id: storedMessages.length + 1,
                userId: 1567,
                sender: currentUser,
                content: messageValue,
            };

            const updatedMessages = [...storedMessages, newMessage];
            setStoredMessages(updatedMessages);
            const jsonValue = JSON.stringify(updatedMessages);
            await AsyncStorage.setItem('myAnswer', jsonValue);
            console.log('Data stored successfully.');
        } catch (e) {
            console.error('Error storing data:', e);
        }
    };

    const onSendMessage = () => {
        storeMessage();
        setMessageValue('');
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput}
                        multiline={true}
                        placeholder="iMessage"
                        value={messageValue}
                        onChangeText={(messageValue) => setMessageValue(messageValue)}
                    />

                    {/* <TouchableOpacity onPress={onSendMessage}>
                        <Image
                            style={styles.sendButton}
                            source={require('../assets/arrow-up.png')}
                        />
                    </TouchableOpacity> */}

                    {!messageValue ? (
                        <Button title="send" disabled />
                    ) : (
                        <Button title="send" onPress={onSendMessage} />
                    )}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        height: 40,
        width: '80%',
        borderRadius: 18,
        padding: 10,
        paddingTop: 10,
        borderColor: 'rgb(206, 204, 204)',
    },
    inputWrapper: {
        flexDirection: 'row',
        width: '100%',
        height: 'auto',
        paddingBottom: 4,
        justifyContent: 'space-around',
    },
    sendButton: {
        padding: 10,
        width: 20,
        height: 20,
    },
});
