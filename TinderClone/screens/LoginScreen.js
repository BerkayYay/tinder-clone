import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import useAuth from '../hooks/useAuth';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const {singInWithGoogleAsync, loading} = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View className="flex-1">
      <ImageBackground
        resizeMode="cover"
        className="flex-1"
        source={{
          uri: 'https://tinder.com/static/tinder.png',
        }}>
        <TouchableOpacity
          style={{marginHorizontal: '25%'}}
          className="absolute bottom-40 w-52 bg-white p-4 rounded-2xl"
          onPress={singInWithGoogleAsync}>
          <Text className="text-center font-semibold">
            Sign in & get swiping
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
