import React, {useContext} from 'react';
import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  console.log('Profile', user);
  return (
    <SafeAreaView style={styles.container}>
      
      <Text style={styles.titleText}>Username</Text> <Text style={styles.lable1}>{user.username}</Text>
      <Text style={styles.titleText}>Email</Text> <Text style={styles.lable1}>{user.email}</Text>
      <Text style={styles.titleText}>Full Name</Text> <Text style={styles.lable1}>{user.full_name}</Text>
      <Button
        title="Log out!"
        onPress={async () => {
          await AsyncStorage.clear();
          setIsLoggedIn(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default Profile;