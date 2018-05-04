import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import {
   Container, Content, Text, View,
   Footer, FooterTab, 
   Button, Thumbnail, Icon,
   Form, Item, Label, Input, Picker, 
} from 'native-base';
import { NavigationActions } from 'react-navigation';

import i18n from '../i18n';

import styles from './styles/TrainerSigninStyles';
import theme from '../themes/';

import SideBarActions, { INITIAL_STATE_TRAINER } from '../redux/SideBarRedux';

import BaseScreen from './BaseScreen';
import {Header} from '../components/Header';

class TrainerSignin extends BaseScreen {
   constructor(props) {
      super(props);
   
      this.state = {
         
      };
   }

   t( name, params={} ) {
      return( i18n.t(`TrainerSignin.${name}`, params) );
   }

   onPressBack() {
      this.props.navigation.goBack();
   }

   onPressLogin() {
      this.props.setSidebar(INITIAL_STATE_TRAINER.items);
      const navigateAction = NavigationActions.navigate({
         routeName: 'DummyScreen',
      });
      this.props.navigation.dispatch(navigateAction);
   }

   render() {
      return (
         <Container style={styles.container}>
            <Header
               title={this.t('header')}
               onPressBack={this.onPressBack.bind(this)}
            />
            <Content style={this.getContentStyle()} contentContainerStyle={styles.contentContainer}>
               <Form style={styles.form}>

                  <Item regular style={styles.item}>
                     <Input style={styles.input} placeholder={this.t('form.usernamePlaceholder')}/>
                  </Item>

                  <Item regular style={styles.item}>
                     <Input secureTextEntry={true} style={styles.input} placeholder={this.t('form.passwordPlaceholder')}/>
                  </Item>

               </Form>
            </Content>
            <Footer>
               <FooterTab>
                  <Button full style={styles.submit} onPress={this.onPressLogin.bind(this)}>
                     <Text style={styles.submitText}>{this.t('form.submit')}</Text>
                  </Button>
               </FooterTab>
            </Footer>
         </Container>
      );s
   }
}

const mapDispatchToProps = (dispatch) => ({
   openSidebar: () => dispatch( SideBarActions.sidebarOpen() ),
   setSidebar: (items) => dispatch( SideBarActions.sidebarSetItems(items) ),
});

export default connect((state)=>({
   nav: state.nav,
   user: state.user,
   sidebar: state.sidebar,
}), mapDispatchToProps)(TrainerSignin);
