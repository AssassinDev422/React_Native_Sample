import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import ReduxNavigation from '../navigation/ReduxNavigation';
import { connect } from 'react-redux';

import SideBarActions from '../redux/SideBarRedux';
import UserActions from '../redux/UserRedux';

// Styles
import styles from './styles/RootContainerStyles';

import { StyleProvider, Drawer } from 'native-base';
import getTheme from '../themes/native-base/components';
import themeVariables from '../themes';

import SideBar from '../components/SideBar';

export const Navigation = {
   navigation: null,
};

class RootContainer extends Component {
   openDrawer() {
      this.props.openSidebar();
   }

   closeDrawer() {
      this.props.closeSidebar();
   }

   render () {
      return (
         <StyleProvider style={getTheme(themeVariables)}>
            <View style={styles.applicationView}>
               <Drawer
                  type="overlay"
                  content={<SideBar/>}
                  onClose={() => this.closeDrawer()}
                  open={this.props.sidebar.opened}
                  negotiatePan={true}
               >
                  <ReduxNavigation />
               </Drawer>
            </View>
         </StyleProvider>
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
   sidebar: state.sidebar,
}), mapDispatchToProps)(RootContainer);
