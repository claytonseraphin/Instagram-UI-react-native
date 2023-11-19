import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  ProfileTabContentContainer: {
    backgroundColor: '#FFFFFF',
  },
  ProfileTabContent: {
    paddingHorizontal: horizontalScale(21),
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  image: {
    width: horizontalScale(120),
    height: verticalScale(90),
    marginTop: verticalScale(11),
  },
});

export default style;
