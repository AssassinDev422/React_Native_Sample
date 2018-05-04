import React, { Component } from 'react';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import styles from './styles/SegmentStyles';

export class Segment extends Component {
   render() {
      return(
         <SegmentedControlTab
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            tabTextStyle={styles.tabTextStyle}
            activeTabTextStyle={styles.activeTabTextStyle}
            {...this.props}
         />
      );
   }
}
