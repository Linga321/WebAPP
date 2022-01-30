import React, {useEffect,useContext,useState} from 'react';
import {StyleSheet,ActivityIndicator,ScrollView} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/hooksApi';
import {uploadsUrl} from '../utils/variables';
import {Card, Text, Button, ListItem, Avatar} from 'react-native-elements';
import {PropTypes} from 'prop-types';
const Profile = ({navigation}) => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const {getFilesByTag} = useTag();
  console.log('Profile', user);

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      const avatar = avatarArray.pop();
      setAvatar(uploadsUrl + avatar.filename);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  return (
    <ScrollView>
      <Card>
        <Card.Title>
          <Text h2>{user.username}</Text>
        </Card.Title>
        <Card.Image
          source={{uri: avatar}}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
        />
        <ListItem>
          <Avatar icon={{name: 'email', color: 'black'}} />
          <Text>{user.email}</Text>
        </ListItem>
        <ListItem>
          <Avatar icon={{name: 'user', type: 'font-awesome', color: 'black'}} />
          <Text>{user.full_name}</Text>
        </ListItem>
        <Button
            title="Log out!"
            onPress={async () => {
              await AsyncStorage.clear();
              setIsLoggedIn(false);
            }}
          />
          <Button
            title="Modify user"
            onPress={() => {
              navigation.navigate('Modify User');
            }}
          />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {width: '100%', height: '30%', aspectRatio: 1},
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;