import {StyleSheet} from 'react-native';
import theme from '../../themes/';

let pickerPlatform = {};
if( theme.platform === 'android' ) pickerPlatform['color'] = theme.brandPrimary;

export default StyleSheet.create({
   container: {
      backgroundColor: theme.brandPrimary,
   },
   contentContainer: {
   },
   form: {
      width: '100%',
      marginBottom: 60,
   },
   item: {
      marginLeft: 0,
      minHeight: 90,
      flex: 0,
   },
   itemPicker: {
      width: '100%',
      borderWidth: 0,
      paddingLeft: 0,
      paddingRight: 0,
      marginLeft: -5,
      marginTop: 20,
      marginBottom: 30,
   },
   picker: {
      width: '100%',
      flex: 1,
      marginLeft: -4,
   },
   pickerText: {
      color: theme.brandPrimary, 
      fontSize: theme.inputFontSize, 
      paddingLeft: 10,
   },
   labelFirst: {
      fontWeight: '700',
   },
   label: {
      fontWeight: '700',
      marginTop: 20,
   },
   labelInline: {

   },
   input: {
      paddingLeft: 0,
      color: theme.defaultTextColor,
   },
   submit: {
      backgroundColor: theme.btnFooterLight,
   },
   submitText: {
      fontSize: theme.btnTextSize,
      lineHeight: theme.btnLineHeight,
   },
   pickerUsual: {
      width: 150,
      ...pickerPlatform,
   }
});
