import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
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
import randomAnswers from '../DATA/randomAnswers.json';
import { useCurrentUser } from '../core/CurrentUserContext';

export const Input = () => {
    const [messageValue, setMessageValue] = useState();
    const [storedMessages, setStoredMessages] = useState(messages);
    const [messageAuto, setMessageAuto] = useState({});
    const { currentUser } = useCurrentUser();

    const storeMessage = async (content, sender) => {
        try {
            const newMessage = {
                id: storedMessages.length + 1,
                sender: sender,
                content: content,
            };

            const updatedMessages = [...storedMessages, newMessage];

            if (messageAuto.content) {
                const autoResponse = {
                    id: updatedMessages.length + 1,
                    sender: messageAuto.sender,
                    content: messageAuto.content,
                };
                updatedMessages.push(autoResponse);
            }

            setStoredMessages(updatedMessages);
            const jsonValue = JSON.stringify(updatedMessages);
            await AsyncStorage.setItem('myAnswer', jsonValue);
            console.log('Data stored successfully.');
        } catch (e) {
            console.error('Error storing data:', e);
        }
    };

    const getRandomMessage = () => {
        const randomIndex = Math.floor(Math.random() * randomAnswers.length);
        const newMessageAuto = randomAnswers[randomIndex];
        setMessageAuto(newMessageAuto);
    };

    const onSendMessage = () => {
        if (messageValue) {
            storeMessage(messageValue, currentUser);
            setMessageValue('');
        }
        setTimeout(() => {
            storeMessage(messageAuto.content, messageAuto.sender);
        }, 3000);
    };

    useEffect(() => {
        getRandomMessage();
    }, []);

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
