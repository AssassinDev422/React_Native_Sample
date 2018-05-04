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
   itemPicker: {
      width: '100%',
      borderWidth: 2,
      borderColor: 'rgb(234,234,234)',
      borderRadius: 4,
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 20,
      marginBottom: 30,
   },
   picker: {
      width: '100%',
      flex: 1,
      marginLeft: -4,
      ...pickerPlatform,
   },
   pickerText: {
      color: theme.defaultTextColor, 
      fontSize: theme.inputFontSize, 
      paddingLeft:10,
   },
   labelFirst: {
      fontWeight: '700',
      //fontFamily: "SFUIText-Bold",
   },
   label: {
      fontWeight: '700',
      marginTop: 20,
      //fontFamily: "SFUIText-Bold",
   },
   input: {
      paddingLeft: 0,
   },
   submit: {
      backgroundColor: theme.btnFooterLight,
   },
   submitText: {
      fontSize: theme.btnTextSize,
      lineHeight: theme.btnLineHeight,
   }
});
