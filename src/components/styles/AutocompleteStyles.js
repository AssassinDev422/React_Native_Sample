import {StyleSheet} from 'react-native';
import theme from '../../themes/';

export default StyleSheet.create({
   container: {
      flex: 1, 
      flexDirection:'row', 
      flexWrap: 'wrap'
   },
   input: {
      paddingLeft: 0,
      color: theme.defaultTextColor,
   },
   selectedItemContainer: {
      alignSelf: 'center', 
      flex: 0, 
      flexDirection: 'row', 
      alignItems: 'center', 
      backgroundColor: theme.brandPrimary, 
      height: 30, 
      paddingLeft: 10, 
      paddingRight: 10, 
      marginRight: 20, 
      borderRadius: 5,
   },
   selectedItemText: {
      color: 'white', 
      marginRight: 20,
   },
   selectedItemIcon: {
      fontSize: 20, 
      color: 'white'
   },
});
