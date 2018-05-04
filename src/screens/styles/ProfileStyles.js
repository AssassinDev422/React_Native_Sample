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
   },
   item: {
      marginLeft: 0,
   },
   picker: {
      flex: 1,
      marginLeft: -4,
      ...pickerPlatform,
   },
   pickerText: {
      color: theme.brandPrimary, 
      fontSize: theme.inputFontSize, 
      paddingLeft:10,
   }
});
