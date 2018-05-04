import {StyleSheet} from 'react-native';
import theme from '../../themes/';

export default StyleSheet.create({
   tabStyle: {
      borderColor: theme.brandPrimary,
   },
   activeTabStyle: {
      backgroundColor: theme.brandPrimary,
   },
   tabTextStyle: {
      color: theme.brandPrimary,
      fontSize: theme.tabFontSize,
   },
   activeTabTextStyle: {
      color: 'white',
   },
});
