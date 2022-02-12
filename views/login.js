import React, {createRef, useContext, useEffect, useState} from 'react';
import {StyleSheet,KeyboardAvoidingView,Platform,TouchableOpacity,Keyboard, View, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/hooksApi';
import LoginForm from '../components/loginform';
import RegisterForm from '../components/registerform';
import {Card, Text, ButtonGroup} from 'react-native-elements';
import LottieView from 'lottie-react-native';
const Login = ({navigation}) => {
  const [formToggle, setFormToggle] = useState(true);
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();
  const animation = createRef();
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
    animation.current?.play();
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
        <ScrollView contentContainerStyle={styles.container2}>
        <Card>
            <Card.Image>
              <LottieView
                ref={animation}
                source={require('../assets/lottie-animation.json')}
                style={styles.animation}
                loop={false}
              />
            </Card.Image>
            <ButtonGroup
              onPress={() => setFormToggle(!formToggle)}
              selectedIndex={formToggle ? 0 : 1}
              buttons={['Login', 'Register']}
            />
          </Card>
          {formToggle ? (
            <Card>
              <Card.Title h4>Login</Card.Title>
              <Card.Divider />
              <LoginForm />
            </Card>
          ) : (
            <Card>
              <Card.Title h4>Register</Card.Title>
              <Card.Divider />
              <RegisterForm setFormToggle={setFormToggle} />
            </Card>
          )}
        </ScrollView>
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
  container2: {
    padding: 16,
  },
});

Login.propTypes = {
    navigation: PropTypes.object,
  };
  
  export default Login;
