import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
   Container, Content, Text, View,
   Button, Thumbnail, Icon,
   Form, Item, Label, Input, Picker, 
} from 'native-base';

import i18n, {m as moment} from '../i18n';

import styles from './styles/CalendarStyles';
import theme from '../themes/';

import BaseScreen from './BaseScreen';
import {Header} from '../components/Header';

import SideBarActions from '../redux/SideBarRedux';

class DummyScreen extends BaseScreen {
   constructor(props) {
      super(props);
   
      this.state = {
      };
   }

   t( name, params={} ) {
      return( i18n.t(`DummyScreen.${name}`, params) );
   }

   render() {
      return (
         <Container style={styles.container}>
            <Header
               hasTabs
               title=''
               onPressMenu={this.onPressMenu.bind(this)}
            />
            <Content style={this.getContentStyle()} contentContainerStyle={styles.contentContainer}>
            </Content>

         </Container>
      );s
   }
}

const mapDispatchToProps = (dispatch) => ({
   openSidebar: () => dispatch( SideBarActions.sidebarOpen() ),
   closeSidebar: () => dispatch( SideBarActions.sidebarClose() ),
});

export default connect((state)=>({
   nav: state.nav,
   user: state.user,
}), mapDispatchToProps)(DummyScreen);
