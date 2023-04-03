import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import useAuth from '../hooks/useAuth';
import fs from '@react-native-firebase/firestore';
import {db} from '../firebase';
import {useRoute} from '@react-navigation/native';
import ReceiverMessage from '../components/ReceiverMessage';
import SenderMessage from '../components/SenderMessage';

const MessageScreen = () => {
  const {user} = useAuth();
  const {params} = useRoute();
  const [input, setInput] = useState([]);
  const [messages, setMessages] = useState([]);
  const {matchDetails} = params;

  useEffect(
    () =>
      db
        .collection('matches')
        .doc(matchDetails.id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
          setMessages(
            snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            })),
          );
        }),
    [matchDetails, db],
  );

  const sendMessage = () => {
    db.collection('matches').doc(matchDetails.id).collection('messages').add({
      timestamp: fs.FieldValue.serverTimestamp(),
      userId: user.uid,
      displayName: user.displayName,
      photoURL: matchDetails.users[user.uid].photoURL,
      message: input,
    });
    setInput('');
  };

  return (
    <SafeAreaView className="flex-1">
      <Header
        callEnabled
        title={getMatchedUserInfo(matchDetails.users, user.uid).displayName}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={10}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            className="pl-4"
            inverted={-1}
            keyExtractor={item => item.id}
            renderItem={({item: message}) =>
              message.userId === user.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>

        <View className="flex-row justify-between items-center border-t border-gray-300 px-5 py-2">
          <TextInput
            placeholder="Send message"
            className="h-10 text-lg"
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
            autoCorrect={false}
          />
          <Button title="Send" color="#FF5864" onPress={sendMessage} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;
