import {View, Text, Button} from 'react-native';
import React from 'react';
import useAuth from '../hooks/useAuth';

const LoginScreen = () => {
  const {singInWithGoogleAsync, loading} = useAuth();
  return (
    <View>
      <Text>{loading ? 'Loading...' : 'I am the LoginScreen'}</Text>
      <Button title="Login" onPress={() => singInWithGoogleAsync()} />
    </View>
  );
};

export default LoginScreen;
