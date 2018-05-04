import {StyleSheet} from 'react-native';
import theme from '../../themes/';

let pickerPlatform = {};
//if( theme.platform === 'android' ) pickerPlatform['color'] = theme.brandPrimary;

export default StyleSheet.create({
   container: {
      backgroundColor: theme.brandPrimary,
   },
   contentContainer: {
      flex: 1,
      justifyContent: 'center',
   },
   form: {
      width: '100%',
   },
   item: {
      borderRadius: 5,
      backgroundColor: theme.titleFontColor,
      height: 59,
      marginTop: 10,
   },
   input: {
      paddingLeft: 20,
      paddingRight: 20,
      color: theme.textColor,
   },
   submit: {
      backgroundColor: theme.btnFooterLight,
   },
   submitText: {
      fontSize: theme.btnTextSize,
      lineHeight: theme.btnLineHeight,
   },
});
