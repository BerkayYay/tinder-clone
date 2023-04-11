import {View, Text, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {db} from '../firebase';
import useAuth from '../hooks/useAuth';
import ChatRow from './ChatRow';

const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const {user} = useAuth();

  useEffect(() => {
    db.collection('matches')
      .where('usersMatched', 'array-contains', user.uid)
      .onSnapshot(snapshot => {
        setMatches(
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })),
        );
      });
  }, [user]);

  return matches.length > 0 ? (
    <FlatList
      className="h-full"
      data={matches}
      keyExtractor={item => item.id}
      renderItem={({item}) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View className="flex flex-col items-center justify-center h-full">
      <Text className="text-2xl font-bold text-gray-500">No matches yet</Text>
    </View>
  );
};

export default ChatList;
