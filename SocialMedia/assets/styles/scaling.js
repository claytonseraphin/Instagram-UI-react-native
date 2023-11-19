import {Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const {width, height} = Dimensions.get('window');

// Device smaller than iphone 6-7-8 scren size
const isSmall = width <= 375 && !DeviceInfo.hasNotch();

const guidelineBaseWidth = () => {
  if (isSmall) {
    return 300;
  }
  return 350;
};

const horizontalScale = size => (width / guidelineBaseWidth()) * size;

const guidelineBaseHeight = () => {
  if (isSmall) {
    return 550;
  } else if (width > 410) {
    return 620;
  }
  return 680;
};

// verticalScale will be used for evertyhing that's vertical such as marginTop,
// marginBottom, marginVertical, paddings, the height of the items etc..
const verticalScale = size => (height / guidelineBaseHeight()) * size;

const guidelineBaseFonts = () => {
  if (width > 410) {
    return 430;
  }
  return 400;
};

const scaleFontSize = size => Math.round((width / guidelineBaseFonts()) * size);

export {horizontalScale, verticalScale, scaleFontSize};
