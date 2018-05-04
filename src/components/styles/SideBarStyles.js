import {StyleSheet} from 'react-native';
import theme from '../../themes/';

export default StyleSheet.create({
   container: {
      backgroundColor: '#FFF',
      padding: 20,
      paddingLeft: 0,
      paddingTop: ( theme.isIphoneX )? 50 : 20,
   },
   header: {
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      marginLeft: 20,
   },
   thumbnail: {
      marginRight: 10,
   },
   itemContainer: {
      borderLeftWidth: 8,
      borderColor: 'transparent',
      paddingLeft: 20,
   },
   itemContainerActive: {
      borderColor: theme.brandPrimary,
   },
   item: {
      height: 54,
      borderBottomWidth: 1,
      borderColor: 'rgb(227,227,229)',
      justifyContent: 'center',
   },
   itemText: {
      fontWeight: 'bold',
      color: theme.textColor,
   },
   itemTextActive: {
      color: theme.brandPrimary,
   },
});
