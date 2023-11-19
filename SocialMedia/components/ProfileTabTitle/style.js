import {StyleSheet} from 'react-native';
import {getFontFamily} from '../../assets/fonts/helper';
import {horizontalScale, scaleFontSize} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  title: {
    color: '#022150',
    fontFamily: getFontFamily('inter', '500'),
    fontSize: scaleFontSize(16),
    padding: horizontalScale(15),
  },
  titleNotFocus: {
    color: '#79869F',
    fontFamily: getFontFamily('inter', '400'),
    fontSize: scaleFontSize(16),
  },
});

export default style;
