import React from 'react';
import {FlatList} from 'react-native';
import {useMedia} from '../hooks/hooksApi';
import ListItem from './ListItem';
import PropTypes from 'prop-types';

const List = ({navigation, myFilesOnly = false}) => {
  const {mediaArray,loading} = useMedia(myFilesOnly);
  console.log('Lists', loading);

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item) => item.file_id.toString()}
      renderItem={({item}) => (
        <ListItem navigation={navigation} singleMedia={item} myFilesOnly={myFilesOnly}/>
      )}
    ></FlatList>
  );
};

List.propTypes = {
  navigation: PropTypes.object,
  myFilesOnly: PropTypes.bool,
};

export default List;