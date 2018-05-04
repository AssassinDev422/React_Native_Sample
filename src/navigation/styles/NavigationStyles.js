import { StyleSheet, Platform } from 'react-native';
import theme from '../../themes/';

export default StyleSheet.create({
   header: {
      backgroundColor: theme.brandPrimary,
   },
   tabBar: {
      backgroundColor: theme.brandPrimary,
      paddingTop: (Platform.OS === 'ios')? 25 : 0,
   }
});
