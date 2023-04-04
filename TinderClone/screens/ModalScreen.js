import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import useAuth from '../hooks/useAuth';
import {db} from '../firebase';
import fs from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const ModalScreen = () => {
  const {user} = useAuth();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);

  const incompleteForm = !image || !job || !age;

  const updateUserProfile = () => {
    db.collection('users')
      .doc(user.uid)
      .set({
        id: user.uid,
        displayName: user.displayName,
        photoURL: image,
        job: job,
        age: age,
        timestamp: fs.FieldValue.serverTimestamp(),
      })
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View className="flex-1 items-center pt-1">
      <Image
        className="h-20 w-full"
        resizeMode="contain"
        source={{uri: 'https://links.papareact.com/2pf'}}
      />

      <Text className="text-xl text-gray-500 p-2 font-bold">
        Welcome {user?.displayName}
      </Text>

      <Text className="text-center p-4 font-bold text-red-400">
        Step 1: The Profile Pic
      </Text>
      <TextInput
        value={image}
        onChangeText={text => setImage(text)}
        className="border-2 border-gray-300 p-2 rounded-lg w-60 text-center"
        placeholder="Enter your profile pic URL"
      />

      <Text className="text-center p-4 font-bold text-red-400">
        Step 2: The Job
      </Text>
      <TextInput
        value={job}
        onChangeText={text => setJob(text)}
        className="border-2 border-gray-300 p-2 rounded-lg w-60 text-center"
        placeholder="Enter your occupation"
      />

      <Text className="text-center p-4 font-bold text-red-400">
        Step 3: The Age
      </Text>
      <TextInput
        value={age}
        onChangeText={text => setAge(text)}
        className="border-2 border-gray-300 p-2 rounded-lg w-60 text-center"
        placeholder="Enter your age"
        keyboardType="numeric"
      />

      <TouchableOpacity
        disabled={incompleteForm}
        onPress={updateUserProfile}
        className={
          incompleteForm
            ? 'w-64 p-3 rounded-xl absolute bottom-10 bg-gray-400'
            : 'w-64 p-3 rounded-xl absolute bottom-10 bg-red-400'
        }>
        <Text className="text-center text-white text-xl">Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
