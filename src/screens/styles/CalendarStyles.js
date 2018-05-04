import {StyleSheet} from 'react-native';
import theme from '../../themes/';

let pickerPlatform = {};
//if( theme.platform === 'android' ) pickerPlatform['color'] = theme.brandPrimary;

export default StyleSheet.create({
   container: {
      backgroundColor: theme.brandPrimary,
   },
   contentContainer: {
      backgroundColor: '#FFF',
   },
   content: {
      flex: 1, 
      backgroundColor: 'rgb(245,245,245)', 
      padding: 0, 
   },
   itemContainer: {
      width: 70, 
      marginRight: 0, 
      padding: 5, 
      paddingBottom: 20, 
   },
   itemContainerActive: {
      borderBottomWidth: 5, 
      borderColor: theme.brandPrimary,
   },
   itemWeekend: {
      color: theme.red,
   },
   itemMonth: {
      marginTop: -10, 
      marginLeft: -5, 
      marginBottom: 5
   },
   itemMonthDay: {
      fontSize: 22,
   },
   cardsContainer: {
      flex: 1, 
      padding: 15, 
      backgroundColor: 'rgb(240,240,240)'
   },
   flatList: {
      height:105, 
      paddingLeft: 15, 
      paddingTop: 15, 
      paddingRight: 15,
   },
   // card
   card: {
      marginBottom: 20,
   },
   cardCategoryContainer: {
      marginLeft: -8
   },
   cardCategory: {
      color: theme.brandPrimary
   },
   cardInteractive: {
      borderWidth: 2, 
      borderColor: theme.red, 
      borderRadius: 3, 
      paddingLeft: 10, 
      paddingRight: 10, 
      paddingTop: 2, 
      paddingBottom: 2
   },
   cardInteractiveText: {
      color: theme.red, 
      fontSize: 14
   },
   cardTitle: {
      fontSize: 27, marginBottom: 10,
   },
   cardDuration: {
      color: 'rgb(183,183,183)',
   },
   cardStartTime: {
      fontWeight: '400',
   },
   cardBottom: {
      width: '100%',
      alignItems: 'center', 
      borderTopWidth: 1, 
      borderColor: 'rgb(183,183,183)'
   },
   cardBottomText: {
      color: theme.brandPrimary, 
      fontSize: 14, 
      marginTop: 10, 
      marginBottom: 10
   },
   cardBottomTextNoncurrent: {
      color: 'rgb(183,183,183)',
   }
});
