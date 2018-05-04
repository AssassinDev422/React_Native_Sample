import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
   Container, Content, Text, View,
   Button, Thumbnail, Icon,
   Form, Item, Label, Input, Picker, 
} from 'native-base';

import i18n from '../i18n';

import styles from './styles/ProfileStyles';
import theme from '../themes/';

import BaseScreen from './BaseScreen';
import {Header} from '../components/Header';
import {Segment} from '../components/Segment';
import Photo from '../components/Photo';

import SideBarActions from '../redux/SideBarRedux';

import {Navigation} from './RootContainer';

class Profile extends BaseScreen {
   constructor(props) {
      super(props);
   
      this.state = {
         sex: "0",
      };
   }

   t( name, params={} ) {
      return( i18n.t(`Profile.${name}`, params) );
   }

   getSexItems() {
      return(['Male', 'Female']);
   }

   onChangeSex( value ) {
      this.setState({
         sex: value,
      });
   }

   render() {
      return (
         <Container style={styles.container}>
            <Header
               title={this.t('header')}
               onPressMenu={this.onPressMenu.bind(this)}
            />
            <Content style={this.getContentStyle()} contentContainerStyle={styles.contentContainer}>
               <Photo 
                  style={{alignSelf: 'center', width: 100, height: 100}}
               />
               <Form style={styles.form}>
                  <Item inlineLabel style={styles.item}>
                     <Label>{this.t('form.firstNameLabel')}</Label>
                     <Input placeholder={this.t('form.firstNamePlaceholder')} placeholderTextColor={theme.brandPrimary}/>
                  </Item>
                  <Item inlineLabel style={styles.item}>
                     <Label>{this.t('form.lastNameLabel')}</Label>
                     <Input placeholder={this.t('form.lastNameLabel')} placeholderTextColor={theme.brandPrimary}/>
                  </Item>
                  <Item inlineLabel style={styles.item}>
                     <Label>{this.t('form.ageLabel')}</Label>
                     <Input placeholder={this.t('form.agePlaceholder')} placeholderTextColor={theme.brandPrimary}/>
                  </Item>
                  <Item inlineLabel style={styles.item}>
                     <Label>{this.t('form.sexLabel')}</Label>
                     <Picker
                        iosHeader="Select one"
                        headerBackButtonText="<"
                        textStyle={styles.pickerText}
                        mode="dropdown"
                        selectedValue={this.state.sex}
                        onValueChange={this.onChangeSex.bind(this)}
                        style={styles.picker}
                     >
                        <Picker.Item label="Male" value="0"/>
                        <Picker.Item label="Female" value="1"/>
                     </Picker>
                  </Item>
                  <Item inlineLabel style={styles.item}>
                     <Label>{this.t('form.emailLabel')}</Label>
                     <Input placeholder={this.t('form.emailLabel')} placeholderTextColor={theme.brandPrimary}/>
                  </Item>
               </Form>
            </Content>
         </Container>
      );
   }
}

const mapDispatchToProps = (dispatch) => ({
   openSidebar: () => dispatch( SideBarActions.sidebarOpen() ),
   closeSidebar: () => dispatch( SideBarActions.sidebarClose() ),
});

export default connect((state)=>({
   nav: state.nav,
   user: state.user,
}), mapDispatchToProps)(Profile);
