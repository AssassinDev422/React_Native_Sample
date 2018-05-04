import React, { Component } from 'react';
import {
   Header as NBHeader, Left, Body, Right, Title,
   Button, Icon, Text,
} from 'native-base';

export class Header extends Component {
   onPressMenu() {
      if( this.props.onPressMenu ) this.props.onPressMenu();
   }

   onPressBack() {
      if( this.props.onPressBack ) this.props.onPressBack();
   }

   getLeftContent() {
      let retval = null;

      if( this.props.onPressMenu ) {
         retval = (
            <Button transparent onPress={this.onPressMenu.bind(this)}>
               <Icon name='menu'/>
            </Button>
         );
      }
      else if( this.props.onPressBack ) {
         retval = (
            <Button transparent onPress={this.onPressBack.bind(this)}>
               <Icon style={{fontSize: 35, marginRight: 5}} name='ios-arrow-back'/><Title>Back</Title>
            </Button>
         );
      }

      return( retval );
   }

   getRightContent() {
      let retval = null;

      if( this.props.onPressMenu ) {
         retval = (
            <Right style={{flex: 0, width: 30 }}/>
         );
      }
      else if( this.props.onPressBack ) {
         retval = (
            <Right style={{flex: 0, width: 80 }}/>
         );
      }

      return( retval );
   }

   render() {
      return(
         <NBHeader iosBarStyle="light-content">
            <Left style={{flex: 0}}>{this.getLeftContent()}</Left>
            <Body style={{alignItems:'center'}}><Title>{this.props.title}</Title></Body>
            {this.getRightContent()}
         </NBHeader>
      );
   }
}
