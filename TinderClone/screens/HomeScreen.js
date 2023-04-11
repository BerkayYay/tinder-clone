import {
  View,
  Text,
  Button,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import {db} from '../firebase';
import fs from '@react-native-firebase/firestore';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-deck-swiper';
import generateId from '../lib/generateId';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {logout, user} = useAuth();
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null);

  useLayoutEffect(() => {
    db.collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        if (!doc.exists) {
          navigation.navigate('Modal');
        }
      });
  }, []);

  useEffect(() => {
    let unsub;
    const fetchProfiles = async () => {
      const passes = [];
      const swipes = [];
      await db
        .collection('users')
        .doc(user.uid)
        .collection('passes')
        .get()
        .then(snapshot => {
          snapshot.docs.map(doc => {
            passes.push(doc.id);
          });
        });

      await db
        .collection('users')
        .doc(user.uid)
        .collection('swipes')
        .get()
        .then(snapshot => {
          snapshot.docs.map(doc => {
            swipes.push(doc.id);
          });
        });

      const passedUserIds = passes.length > 0 ? passes : ['test'];
      const swipedUserIds = swipes.length > 0 ? swipes : ['test'];

      db.collection('users')
        .where('id', 'not-in', [...passedUserIds, ...swipedUserIds])
        .onSnapshot(snapshot => {
          setProfiles(
            snapshot.docs
              .filter(doc => doc.id !== user.uid)
              .map(doc => ({
                id: doc.id,
                ...doc.data(),
              })),
          );
        });
    };
    fetchProfiles();
  }, [db]);

  const swipeLeft = async cardIndex => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log(`You swiped pass on ${userSwiped.displayName}`);
    db.collection('users')
      .doc(user.uid)
      .collection('passes')
      .doc(userSwiped.id)
      .set(userSwiped);
  };

  const swipeRight = async cardIndex => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    const loggedInUser = (
      await db.collection('users').doc(user.uid).get()
    ).data();

    // Check if the user swiped right on the other user
    db.collection('users')
      .doc(userSwiped.id)
      .collection('swipes')
      .doc(user.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          // user has matched with you before you matched with them
          console.log('Matched with ' + userSwiped.displayName);
          db.collection('users')
            .doc(user.uid)
            .collection('swipes')
            .doc(userSwiped.id)
            .set(userSwiped);

          // create a match
          db.collection('matches')
            .doc(generateId(user.uid, userSwiped.id))
            .set({
              users: {
                [user.uid]: loggedInUser,
                [userSwiped.id]: userSwiped,
              },
              usersMatched: [user.uid, userSwiped.id],
              timestamp: fs.FieldValue.serverTimestamp(),
            });

          // navigate to the match screen
          navigation.navigate('Match', {
            loggedInUser,
            userSwiped,
          });
        } else {
          // user has not matched with you before you matched with them
          console.log('You swiped right on ' + userSwiped.displayName);
          db.collection('users')
            .doc(user.uid)
            .collection('swipes')
            .doc(userSwiped.id)
            .set(userSwiped);
        }
      });

    db.collection('users')
      .doc(user.uid)
      .collection('swipes')
      .doc(userSwiped.id)
      .set(userSwiped);
  };

  const renderCard = card => {
    return (
      <>
        {card ? (
          <View key={card.id} className="bg-white h-3/5 rounded-xl relative">
            <Image
              className="h-full w-full rounded-xl"
              source={{uri: card.photoURL}}
            />
            <View
              style={styles.cardShadow}
              className="flex-row bg-white w-full h-20 justify-between items-center px-6 py-2 rounded-b-xl">
              <View className="flex-col ">
                <Text className="font-bold text-xl">{card.displayName}</Text>
                <Text>{card.job}</Text>
              </View>
              <Text className="font-bold text-2xl">{card.age}</Text>
            </View>
          </View>
        ) : (
          <View
            className="relative bg-white h-3/4 rounded-xl justify-center items-center"
            style={styles.cardShadow}>
            <Text className="font-bold pb-5">No more profiles</Text>
            <Image
              className="h-20 w-20"
              height={100}
              width={100}
              source={{uri: 'https://links.papareact.com/6gb'}}
            />
          </View>
        )}
      </>
    );
  };

  return (
    <SafeAreaView className="flex-1">
      {/* Header */}
      <View className="flex-row justify-between items-center px-5">
        <TouchableOpacity onPress={logout}>
          <Image
            className="h-10 w-10 rounded-full"
            source={{uri: user.photoURL}}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Modal')}>
          <Image
            className="h-14 w-14"
            source={require('../assets/tinderLogo.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>
      {/* End of Header */}

      {/* Cards */}
      <View className="flex-1 -mt-6">
        <Swiper
          ref={swipeRef}
          containerStyle={{backgroundColor: 'transparent'}}
          stackSize={3}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          cards={profiles}
          onSwipedLeft={cardIndex => {
            swipeLeft(cardIndex);
          }}
          onSwipedRight={cardIndex => {
            swipeRight(cardIndex);
          }}
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  textAlign: 'center',
                  color: 'red',
                },
              },
            },
            right: {
              title: 'MATCH',
              style: {
                label: {
                  color: '#4DED30',
                },
              },
            },
          }}
          renderCard={renderCard}
        />
      </View>

      <View className="flex flex-row justify-evenly">
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          className="items-center justify-center rounded-full w-16 h-16 bg-red-200">
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          className="items-center justify-center rounded-full w-16 h-16 bg-green-200">
          <AntDesign name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

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
