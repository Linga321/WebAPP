import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const {setIsLoggedIn} = useContext(MainContext);

  const checkToken = async () => {
    const userToken = await AsyncStorage.getItem('x-access-token');
    console.log('token value in async storage', userToken);
    // dummy validation for user token
    if (userToken === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0NywidXNlcm5hbWUiOiJnYWphbGFrYyIsImVtYWlsIjoiZ2FqYWxha2NAbWV0cm9wb2xpYS5maSIsImZ1bGxfbmFtZSI6bnVsbCwiaXNfYWRtaW4iOm51bGwsInRpbWVfY3JlYXRlZCI6IjIwMjItMDEtMTZUMTc6MDU6NTIuMDAwWiIsImlhdCI6MTY0MjM1MzAzMSwiZXhwIjoxNjQyNDM5NDMxfQ.OSnLcdtA8fEWaHZR6awB8apGyRR9SuV1ezrWsYkaA5I') {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const logIn = async () => {
    console.log('Login button pressed');
    await AsyncStorage.setItem('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0NywidXNlcm5hbWUiOiJnYWphbGFrYyIsImVtYWlsIjoiZ2FqYWxha2NAbWV0cm9wb2xpYS5maSIsImZ1bGxfbmFtZSI6bnVsbCwiaXNfYWRtaW4iOm51bGwsInRpbWVfY3JlYXRlZCI6IjIwMjItMDEtMTZUMTc6MDU6NTIuMDAwWiIsImlhdCI6MTY0MjM1MzAzMSwiZXhwIjoxNjQyNDM5NDMxfQ.OSnLcdtA8fEWaHZR6awB8apGyRR9SuV1ezrWsYkaA5I');
    setIsLoggedIn(true);
  };
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;