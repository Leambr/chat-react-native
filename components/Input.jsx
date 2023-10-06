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

export const Input = () => {
    const [messageValue, setMessageValue] = useState();
    // const [randomAnswer, setRandomAnswer] = useState();

    // const randomAnswerList = [
    //     { id: 8, sender: '+33112121212', content: 'Plutôt ce soir' },
    //     { id: 8, sender: '+33112121212', content: 'Demain si ça te va' },
    //     { id: 8, sender: '+33112121212', content: 'Je sais pas comme tu veux' },
    // ];

    // const chooseRandomAnswer = () => {
    //     const choosenAnswer = randomAnswerList[Math.floor(Math.random() * randomAnswerList.length)];
    //     setRandomAnswer(choosenAnswer);
    // };

    const onSendMessage = () => {
        messages.push({ userId: 1567, sender: '+33112121212', content: messageValue });
        setMessageValue('');
    };

    // useEffect(() => {
    //     setTimeout(() => {
    //         chooseRandomAnswer;
    //     }, 3000);
    // }, []);

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

                    {!messageValue ? (
                        <Button title="send" onPress={onSendMessage} disabled />
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
});
