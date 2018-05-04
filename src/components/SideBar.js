import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import {
   Content, View, Text,
   Button, Thumbnail,
} from 'native-base';
import { connect } from 'react-redux';
import * as ReactNavigation from 'react-navigation';
import { NavigationActions } from 'react-navigation';

import theme from '../themes/';

import SideBarActions from '../redux/SideBarRedux';

import styles from './styles/SideBarStyles';
import {Navigation} from '../screens/RootContainer';

class SideBarItem extends Component {
   get containerStyle() {
      let retval = [styles.itemContainer];
      if( this.props.data.active ) retval.push( styles.itemContainerActive );
      return( retval );
   }

   get itemTextStyle() {
      let retval = [styles.itemText];
      if( this.props.data.active ) retval.push( styles.itemTextActive );
      return( retval );
   }

   onPress() {
      if( this.props.onPress ) this.props.onPress( this.props.data );
   }

   render() {
      const item = this.props.data;
      return(
         <View style={this.containerStyle}>
            <View style={styles.item}>
               <TouchableOpacity onPress={this.onPress.bind(this)}>
                  <Text style={this.itemTextStyle}>{item.title}</Text>
               </TouchableOpacity>
            </View>
         </View>
      );
   }
}

class SideBar extends Component {
   onPressItem( item ) {
      this.navigate( item.route );
   }

   onPressProfile() {
      this.navigate( 'Profile' );
   }

   navigate( routeName ) {
      const { dispatch, nav } = this.props;
      const navigation = ReactNavigation.addNavigationHelpers({
         dispatch,
         state: nav,
      });
      
      const navigateAction = NavigationActions.reset({
         index: 0,
         actions: [
            NavigationActions.navigate({ routeName }),
         ],
      });
      navigation.dispatch(navigateAction);

      setTimeout(()=>{
         this.props.activateItem( routeName );
      }, 100);
      
      this.props.closeSidebar();
   }

   render() {
      // const firstName = this.props.user.properties.firstName || 'John'; //Modified by Steve
      // const lastName = this.props.user.properties.lastName || 'Smith';
      const firstName = '';
      const lastName = '';


      return(
         <Content style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={this.onPressProfile.bind(this)}>
               <Thumbnail small style={styles.thumbnail}  source={require('../images/photo.png')}/>
               <Text>{firstName} {lastName}</Text> 
            </TouchableOpacity>
            {this.props.sidebar.items.map((item, idx)=>(
               <SideBarItem key={idx} data={item} onPress={this.onPressItem.bind(this)}/>
            ))}
         </Content>
      );
   }
}

const mapDispatchToProps = (dispatch) => ({
   dispatch,
   openSidebar: () => dispatch( SideBarActions.sidebarOpen() ),
   closeSidebar: () => dispatch( SideBarActions.sidebarClose() ),
   activateItem: (route) => dispatch( SideBarActions.sidebarActivateItem(route) ),
});

export default connect((state)=>({
   nav: state.nav,
   user: state.user,
   sidebar: state.sidebar,
}), mapDispatchToProps)(SideBar);
