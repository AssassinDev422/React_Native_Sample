import {StyleSheet} from 'react-native';
import theme from '../../themes/';

export default StyleSheet.create({
   contentContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: theme.brandPrimary,
      padding: 15,
      paddingRight: 30,
      alignItems: 'center',
   },
   logoContainer: {
      flex: 0, 
      flexDirection: 'row',
      alignItems: 'center',
   },
   logo: {
      width: 52, 
      height: 44,
      marginRight: 10,
   },
   h1: {
      color: theme.titleFontColor,
      fontSize: 52,
      lineHeight: 56,
   },
   subheader: {
      color: theme.titleFontColor,
      marginTop: 25,
   },
   footerText: {
      color: theme.titleFontColor,
   },
   form: {
      width: '100%',
      backgroundColor: theme.brandPrimary,
      padding: 25,
      alignItems: 'center',
      paddingBottom: theme.footerPaddingBottom+25,
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
   buttonsRow: {
      flex: 0,
      flexDirection: 'row',
      width: '100%',
      borderBottomWidth: 2,
      borderColor: theme.brandLight,
      marginTop: 20,
      marginBottom: 17,
      paddingBottom: 20,
   },
   btnSignup: {
      flex: 1,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: theme.titleFontColor,
      alignItems: 'center',
      padding: 15,
      marginRight: 5,
   },
   btnSignupText: {
      color: theme.titleFontColor,
   },
   btnSignin: {
      flex: 1,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: theme.btnFooterDark,
      alignItems: 'center',
      padding: 15,
      backgroundColor: theme.btnFooterDark,
      marginLeft: 5,
   },
   btnSigninText: {
      color: theme.titleFontColor,
   },
   footerLink: {
      alignSelf: 'center',
      marginTop: 5,
   },
   footerLinkText: {
      color: theme.btnFooterDark,
   },
});
