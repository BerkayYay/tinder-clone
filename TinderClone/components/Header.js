import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Header = ({title, callEnabled}) => {
  const navigation = useNavigation();
  return (
    <View className=" flex-row items-center justify-between p-2">
      <View className="flex flex-row items-center">
        <TouchableOpacity className="p-2" onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold pl-2">{title}</Text>
      </View>

      {callEnabled && (
        <TouchableOpacity className="p-3 rounded-full mr-4 bg-red-200">
          <Ionicons name="call" size={20} color="#FF5864" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
