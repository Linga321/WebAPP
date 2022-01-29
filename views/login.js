import React, {useContext, useEffect} from 'react';
import {StyleSheet,KeyboardAvoidingView,Platform,TouchableOpacity,Keyboard, View} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/hooksApi';
import LoginForm from '../components/loginform';
import RegisterForm from '../components/registerform';
import {Card, Text} from 'react-native-elements';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();

  const checkToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token value in async storage', userToken);
    if (!userToken) {
      return;
    }
    try {
      const userData = await getUserByToken(userToken);
      console.log('chekToken', userData);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <TouchableOpacity
      style={{flex: 1}}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={styles.container} >
        <View style={styles.appTitle}>
          <Text>MyApp</Text>
        </View>
        <View style={styles.form}>
          <Card>
            <Card.Title h4>Login</Card.Title>
            <Card.Divider />
            <LoginForm />
          </Card>
          <Card>
            <Card.Title h4>Register</Card.Title>
            <Card.Divider />
            <RegisterForm />
          </Card>
        </View>
      </KeyboardAvoidingView>
    </TouchableOpacity>
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