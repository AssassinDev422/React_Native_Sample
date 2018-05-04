import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
   Container, Content, Text, View,
   Footer, FooterTab, 
   Button, Thumbnail, Icon,
   Form, Item, Label, Input, Picker, 
} from 'native-base';

import i18n from '../i18n';

import styles from './styles/RequestClassStyles';
import theme from '../themes/';

import BaseScreen from './BaseScreen';
import {Header} from '../components/Header';

import SideBarActions from '../redux/SideBarRedux';

class RequestClass extends BaseScreen {
   constructor(props) {
      super(props);
   
      this.state = {
         duration: "0",
      };
   }

   t( name, params={} ) {
      return( i18n.t(`RequestClass.${name}`, params) );
   }

   getDurationItems() {
      return(['5 min', 'Female']);
   }

   onChangeDuration( idx ) {
      this.setState({
         duration: idx,
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
               <Form style={styles.form}>
                  <Label style={styles.labelFirst}>{this.t('form.classTypeLabel')}</Label>
                  <Item style={styles.item}>
                     <Input style={styles.input} placeholder={this.t('form.classTypePlaceholder')}/>
                  </Item>

                  <Label style={styles.label}>{this.t('form.whatLikeLabel')}</Label>
                  <Item style={styles.item}>
                     <Input style={styles.input} placeholder={this.t('form.whatLikePlaceholder')}/>
                  </Item>

                  <Label style={styles.label}>{this.t('form.durationLabel')}</Label>
                  <View style={styles.itemPicker}>
                     <Picker
                        iosHeader="Select one"
                        headerBackButtonText="<"
                        textStyle={styles.pickerText}
                        mode="dropdown"
                        selectedValue={this.state.duration}
                        onValueChange={this.onChangeDuration.bind(this)}
                        style={styles.picker}
                     >
                        <Picker.Item label="5 Minutes" value="0"/>
                        <Picker.Item label="10 Minutes" value="1"/>
                     </Picker>
                  </View>

                  <Item style={styles.item}/>
               </Form>
            </Content>
            <Footer>
               <FooterTab>
                  <Button full style={styles.submit}>
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
   closeSidebar: () => dispatch( SideBarActions.sidebarClose() ),
});

export default connect((state)=>({
   nav: state.nav,
   user: state.user,
}), mapDispatchToProps)(RequestClass);
