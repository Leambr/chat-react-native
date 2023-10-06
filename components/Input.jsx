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
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Input = () => {
    const [messageValue, setMessageValue] = useState();

    const storeData = async () => {
        try {
            const jsonValue = JSON.stringify(messageValue);
            console.log('jsonValue', jsonValue);
            await AsyncStorage.setItem('answer', jsonValue);
            console.log('Data stored successfully.');
        } catch (e) {
            console.error('Error storing data:', e);
        }
    };

    const onSendMessage = () => {
        messages.push({
            id: messages.length + 1,
            userId: 1567,
            sender: '+33112121212',
            content: messageValue,
        });
        storeData();
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
