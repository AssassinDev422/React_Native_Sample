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

import styles from './styles/TrainerSignupStyles';
import theme from '../themes/';

import BaseScreen from './BaseScreen';
import {Header} from '../components/Header';
import Photo from '../components/Photo';

import SideBarActions, { INITIAL_STATE_TRAINER } from '../redux/SideBarRedux';
import UserActions from '../redux/UserRedux';

const trainerWasCreated = false;

class TrainerSignup extends BaseScreen {
   constructor(props) {
      super(props);
   
      this.state = {
         firstName: '',
         lastName: '',
         email: '',
         password: '',
      };
   }

   t( name, params={} ) {
      return( i18n.t(`TrainerSignup.${name}`, params) );
   }

   onPressBack() {
      this.props.navigation.goBack();
   }

   onPressBottomLink() {
      const navigateAction = NavigationActions.navigate({
         routeName: 'TrainerSignin',
      });
      this.props.navigation.dispatch(navigateAction);
   }

   onPressSubmit() {
      const s = this.state;
      if( s.firstName && s.lastName && s.email && s.password ) {
         this.props.createTrainer({
            firstName: s.firstName,
            lastName: s.lastName,
            email: s.email,
            password: s.password,
         });
      }
   }

   componentWillReceiveProps( nextProps ) {
      if( !trainerWasCreated && nextProps.user.properties.firstName && nextProps.user.properties.firstName!=this.props.user.properties.firstName ) {
         trainerWasCreated = true;
         this.props.setSidebar( INITIAL_STATE_TRAINER.items );
         const navigateAction = NavigationActions.navigate({
            routeName: 'DummyScreen',
         });
         this.props.navigation.dispatch(navigateAction);
      }
   }

   render() {
      return (
         <Container style={styles.container}>
            <Header
               title={this.t('header')}
               onPressBack={this.onPressBack.bind(this)}
            />
            <Content style={this.getContentStyle()} contentContainerStyle={styles.contentContainer}>
               <Photo 
                  style={{alignSelf: 'center', width: 100, height: 100}}
               />
               <Form style={styles.form}>

                  <Item style={styles.item}>
                     <Input style={styles.input} placeholder={this.t('form.firstName')} value={this.state.firstName} onChangeText={(firstName)=>{this.setState({firstName})}}/>
                  </Item>

                  <Item style={styles.item}>
                     <Input style={styles.input} placeholder={this.t('form.lastName')} value={this.state.lastName} onChangeText={(lastName)=>{this.setState({lastName})}}/>
                  </Item>

                  <Item style={styles.item}>
                     <Input style={styles.input} placeholder={this.t('form.email')} value={this.state.email} onChangeText={(email)=>{this.setState({email})}}/>
                  </Item>

                  <Item style={styles.item}>
                     <Input secureTextEntry={true} style={styles.input} placeholder={this.t('form.password')} value={this.state.password} onChangeText={(password)=>{this.setState({password})}}/>
                  </Item>

                  <Item style={styles.item}/>
               </Form>

               <Text style={styles.bottomText}>{this.t('bottomText')}</Text>

               <TouchableOpacity style={styles.bottomLink} onPress={this.onPressBottomLink.bind(this)}>
                  <Text style={styles.bottomLinkText}>{this.t('bottomLink')}</Text>
               </TouchableOpacity>
            </Content>
            <Footer>
               <FooterTab>
                  <Button full style={styles.submit} onPress={this.onPressSubmit.bind(this)}>
                     <Text style={styles.submitText}>{this.t('form.submit')}</Text>
                  </Button>
               </FooterTab>
            </Footer>
         </Container>
      );s
   }
}

const mapDispatchToProps = (dispatch) => ({
   createTrainer: (data) => dispatch( UserActions.createTrainerRequest(data) ),
   setSidebar: (items) => dispatch( SideBarActions.sidebarSetItems(items) ),
});

export default connect((state)=>({
   nav: state.nav,
   user: state.user,
}), mapDispatchToProps)(TrainerSignup);
