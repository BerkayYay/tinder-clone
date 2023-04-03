import {View, Text} from 'react-native';
import React from 'react';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import {AuthProvider} from './hooks/useAuth';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
