import React from 'react';
import {View, Text} from 'react-native';

import style from './style';
import PropTypes from 'prop-types';

import UserProfileImage from '../userProfileImage/UserProfileImage';
import {horizontalScale} from '../../assets/styles/scaling';

const UserStory = props => {
  return (
    <View style={style.storyContainer}>
      <UserProfileImage
        profileImage={props.profileImage}
        imageDimensions={horizontalScale(65)}
      />
      <Text style={style.firstName}>{props.firstName}</Text>
    </View>
  );
};

UserStory.propTypes = {
  firstName: PropTypes.string.isRequired,
  profileImage: PropTypes.any.isRequired,
};

export default UserStory;
