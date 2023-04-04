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
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-deck-swiper';

// create a Dummy Data for the cards which includes firstName, lastName, occupation, age, and photoURL
const Dummy_Data = [
  {
    id: 1,
    firstName: 'Elon',
    lastName: 'Musk',
    job: 'CEO of Tesla',
    age: 49,
    photoURL:
      'https://upload.wikimedia.org/wikipedia/commons/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg',
  },
  {
    id: 2,
    firstName: 'Angelina',
    lastName: 'Jolie',
    job: 'Actress',
    age: 45,
    photoURL:
      'https://img-s3.onedio.com/id-54a6f9125122263033f993a8/rev-0/raw/s-c10a567da9a42c4b450a351659ae37157fa18aeb.jpg',
  },
  {
    id: 3,
    firstName: 'Alexis',
    lastName: 'Ren',
    job: 'Model',
    age: 26,
    photoURL: 'https://media.1815.io/jfk/i/full/2021/10/Alexis-Ren-1.jpg',
  },
];

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
    const fetchProfiles = async () => {
      db.collection('users').onSnapshot(snapshot => {
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
  }, []);

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
          onSwipedLeft={() => console.log('swipe PASS')}
          onSwipedRight={() => console.log('swiped MATCH')}
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
          renderCard={renderCard}></Swiper>
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
