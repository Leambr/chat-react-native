import { View, StyleSheet, Text } from 'react-native';
import { useCurrentUser } from '../core/CurrentUserContext';

export const Message = ({ textMessage }) => {
    const { currentUser } = useCurrentUser();
    const isMyMessage = currentUser === textMessage.sender;

    return (
        <View
            style={[
                styles.messageWrapper,
                {
                    alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
                    backgroundColor: isMyMessage ? 'rgb(20, 121, 244)' : 'rgb(229, 229, 234)',
                },
            ]}
        >
            {/* <Text style={[styles.sender, { color: isMyMessage ? 'white' : 'black' }]}>
                {textMessage.sender}
            </Text> */}
            <Text style={[styles.textMessage, { color: isMyMessage ? 'white' : 'black' }]}>
                {textMessage.content}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    messageWrapper: {
        backgroundColor: 'rgb(20, 121, 244)',
        borderRadius: 18,
        padding: 10,
        margin: 4,
        maxWidth: '70%',
    },
    textMessage: {
        fontSize: 16,
        color: 'white',
    },
    sender: {
        color: 'rgb(206, 204, 204)',
    },
});
