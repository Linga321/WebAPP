import React, {useContext, useState, useCallback} from 'react';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {MainContext} from '../contexts/MainContext';
import {useMedia, useTag} from '../hooks/hooksApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input,Card,  Button} from 'react-native-elements';
import {PropTypes} from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import {useFocusEffect} from '@react-navigation/native';
import {appId} from '../utils/variables';
import {Video} from 'expo-av';

const Upload = ({navigation}) => {
  const [image, setImage] = useState(
    'https://place-hold.it/300x200&text=Choose'
  );
  const [type, setType] = useState('image');
  const [imageSelected, setImageSelected] = useState(false);
  const {postMedia, loading} = useMedia();
  const {postTag} = useTag();
  const {update, setUpdate} = useContext(MainContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
      setImageSelected(true);
      setType(result.type);
    }
  };

  const reset = () => {
    setImage('https://place-hold.it/300x200&text=Choose');
    setImageSelected(false);
    setValue('title', '');
    setValue('description', '');
    setType('image');
  };

  useFocusEffect(
    useCallback(() => {
      return () => reset();
    }, [])
  );

  const onSubmit = async (data) => {
    if (!imageSelected) {
      Alert.alert('Please, select a file');
      return;
    }
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    const filename = image.split('/').pop();
    let fileExtension = filename.split('.').pop();
    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;
    formData.append('file', {
      uri: image,
      name: filename,
      type: type + '/' + fileExtension,
    });

    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postMedia(formData, token);
      console.log('upload response', response);
      const tagResponse = await postTag(
        {
          file_id: response.file_id,
          tag: appId,
        },
        token
      );
      console.log('tag response', tagResponse);
      tagResponse &&
        Alert.alert('File', 'uploaded', [
          {
            text: 'Ok',
            onPress: () => {
              setUpdate(update + 1);
              navigation.navigate('Home');
            },
          },
        ]);
    } catch (error) {
      console.log('Please check/ verify the image');
    }
  };

  console.log('type', type);

  return (
    <ScrollView>
      <Card>
        {type === 'image' ? (
          <Card.Image
            source={{uri: image}}
            style={styles.image}
            onPress={pickImage}
          ></Card.Image>
        ) : (
          <Video
            source={{uri: image}}
            style={styles.image}
            useNativeControls={true}
            resizeMode="cover"
            onError={(err) => {
              console.error('video', err);
            }}
          />
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              placeholder="Title"
              errorMessage={errors.title && 'This is required.'}
            />
          )}
          name="title"
        />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              placeholder="Description"
              errorMessage={errors.description && 'This is required.'}
            />
          )}
          name="description"
        />

        <Button title="Choose image" onPress={pickImage} />
        <Button
          disabled={!imageSelected}
          loading={loading}
          title="Upload"
          onPress={handleSubmit(onSubmit)}
        />
        <Button title="Reset" onPress={reset} />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 15,
    resizeMode: 'contain',
  },
});

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;