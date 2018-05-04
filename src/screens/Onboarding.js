import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import {
   Container, Content, View, Text,
   Form, Item, Label, Input, Button,
} from 'native-base';
import { NavigationActions } from 'react-navigation';

import styles from './styles/OnboardingStyles';
import theme from '../themes/';
import i18n from '../i18n';

import BaseFullscreen from './BaseFullscreen';

class Onboarding extends BaseFullscreen {
   constructor(props) {
      super(props);
   
      this.state = {
         duration: "0",
         windowHeight: null,
         bodyHeight: null,
         formHeight: null,
      };
   }

   t( name, params={} ) {
      return( i18n.t(`Onboarding.${name}`, params) );
   }

   onPressFooterLink() {
      // const navigateAction = NavigationActions.navigate({
      //    routeName: 'TrainerSignup',
      // });
      // this.props.navigation.dispatch(navigateAction);
   }

   onPressSignin() {
      const navigateAction = NavigationActions.navigate({
         routeName: 'Calendar',
      });
      this.props.navigation.dispatch(navigateAction);
   }

   onPressSignup() {
   }

   componentWillMount() {
      const height = Dimensions.get('window').height;
      this.setState({ windowHeight: height });
   }

   /**
    * Weird variant, but I hope it's temp one
    * @return
    */
   calcPaddingForBody() {
      let retval = 100;

      const { windowHeight, bodyHeight, formHeight } = this.state;
      if( windowHeight && bodyHeight && formHeight ) {
         retval = (windowHeight-formHeight) / 2 - 70;
      }

      return( retval );
   }

   render() {
      return (
         <Container style={{backgroundColor: theme.brandPrimary}}>

            <Content style={this.getContentStyle()} contentContainerStyle={styles.contentContainer}>
               <ScrollView contentContainerStyle={{paddingTop: this.calcPaddingForBody(), alignItems: 'center'}} onLayout={(event) => {
                  const {height} = event.nativeEvent.layout;
                  this.setState({ bodyHeight: height });
               }}>
                  <View style={styles.logoContainer}>
                     <Image style={styles.logo} source={require('../images/logo-white.png')}/>
                     <Text style={styles.h1}>{this.t('logoTitle')}</Text>
                  </View>

                  <Text style={styles.subheader}>{this.t('subheader')}</Text>
               </ScrollView>

               <Form style={styles.form} onLayout={(event) => {
                  const {height} = event.nativeEvent.layout;
                  this.setState({ formHeight: height });
               }}>

                  <Item regular style={styles.item}>
                     <Input style={styles.input} placeholder={this.t('form.usernamePlaceholder')} placeholderTextColor={theme.inputColorPlaceholder2}/>
                  </Item>

                  <Item regular style={styles.item}>
                     <Input secureTextEntry={true} style={styles.input} placeholder={this.t('form.passwordPlaceholder')} placeholderTextColor={theme.inputColorPlaceholder2}/>
                  </Item>

                  <View style={styles.buttonsRow}>
                     <TouchableOpacity style={styles.btnSignup} onPress={this.onPressSignup.bind(this)}>
                        <Text style={styles.btnSignupText}>{this.t('form.btnSignup')}</Text>
                     </TouchableOpacity>

                     <TouchableOpacity style={styles.btnSignin} onPress={this.onPressSignin.bind(this)}>
                        <Text style={styles.btnSigninText}>{this.t('form.btnSignin')}</Text>
                     </TouchableOpacity>
                  </View>

                  <Text style={styles.footerText}>{this.t('footerText')}</Text>

                  <TouchableOpacity style={styles.footerLink} onPress={this.onPressFooterLink.bind(this)}>
                      <Text style={styles.footerLinkText}>{this.t('footerLink')}</Text>
                  </TouchableOpacity>

               </Form>

            </Content>

         </Container>
      );
   }
}

const mapDispatchToProps = (dispatch) => ({
});

export default connect((state)=>({
   nav: state.nav,
   user: state.user,
}), mapDispatchToProps)(Onboarding);
