import React, { Component } from 'react';
import theme from '../themes/';

export default class BaseScreen extends Component {
   getContentStyle() {
      return({
         flex: 1,
         backgroundColor: theme.contentBg,
         padding: 20,
      });
   }

   onPressMenu() {
      if( this.props.openSidebar ) this.props.openSidebar();
   }

   render() {
      return( null );
   }
}
