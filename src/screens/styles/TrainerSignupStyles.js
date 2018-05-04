import {StyleSheet} from 'react-native';
import theme from '../../themes/';

let pickerPlatform = {};
//if( theme.platform === 'android' ) pickerPlatform['color'] = theme.brandPrimary;

export default StyleSheet.create({
   container: {
      backgroundColor: theme.brandPrimary,
   },
   contentContainer: {
   },
   form: {
      width: '100%',
   },
   item: {
      marginLeft: 0,
   },
   input: {
      paddingLeft: 0,
      color: theme.textColor,
   },
   submit: {
      backgroundColor: theme.btnFooterLight,
   },
   submitText: {
      fontSize: theme.btnTextSize,
      lineHeight: theme.btnLineHeight,
   },
   bottomText: {
      color: theme.btnFooterLight,
      alignSelf: 'center',
      marginTop: 20,
   },
   bottomLink: {
      alignSelf: 'center',
      marginTop: 5,
   },
   bottomLinkText: {
      color: theme.btnFooterDark,
   },
});
