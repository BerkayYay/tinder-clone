import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import {db} from '../firebase';

const ChatRow = ({matchDetails}) => {
  const navigation = useNavigation();
  const {user} = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);

  useEffect(() => {
    db.collection('matches')
      .doc(matchDetails.id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setLastMessage(snapshot.docs[0]?.data().message);
      });
  }, [matchDetails, db]);

  return (
    <TouchableOpacity
      style={styles.cardShadow}
      className="flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg"
      onPress={() =>
        navigation.navigate('Message', {
          matchDetails,
        })
      }>
      <Image
        className="w-16 h-16 rounded-full mr-4"
        source={{uri: matchedUserInfo?.photoURL}}
      />
      <View>
        <Text className="text-lg font-semibold">
          {matchedUserInfo?.displayName}
        </Text>
        <Text className="text-sm text-gray-500">
          {lastMessage ? lastMessage : 'Say hi!'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default ChatRow;
