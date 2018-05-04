import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, TouchableOpacity, } from 'react-native';
import {
   Container, Content, Text, View,
   Button, Thumbnail, Icon, Item,
   Card, CardItem, Body, Left, Right,
} from 'native-base';
import { NavigationActions } from 'react-navigation';

import i18n, {m as moment} from '../i18n';

import styles from './styles/CalendarStyles';
import theme from '../themes/';

import BaseScreen from './BaseScreen';
import {Header} from '../components/Header';

import SideBarActions, { INITIAL_STATE_USER } from '../redux/SideBarRedux';
import LessonActions from '../redux/LessonRedux';

const dateFormat = "MMMM D, YYYY h:mm a";

class CalendarCard extends Component {
   get sameDay() {
      const dayFormat = 'YYYYMD';
      const day1 = moment(this.props.item.starts).format(dayFormat);
      const day2 = moment().format(dayFormat);

      return( day1 === day2 );
   }

   get bottomText() {
      return (this.sameDay)? this.t('joinClass') : this.t('bookClass');
   }

   get bottomTextStyle() {
      return (this.sameDay)? styles.cardBottomText : [styles.cardBottomText, styles.cardBottomTextNoncurrent];
   }

   get buttonStyle() {
      return (this.sameDay)? null : {backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.brandPrimary, borderRadius: 3};
   }

   get buttonTextStyle() {
      return (this.sameDay)? {fontSize: theme.DefaultFontSize} : {fontSize: theme.DefaultFontSize, color: theme.brandPrimary};
   }

   t( name, params={} ) {
      return( i18n.t(`Calendar.${name}`, params) );
   }

   getInteractive( interactive ) {
      let retval = null;

      if( interactive ) {
         retval = (
            <View style={styles.cardInteractive}>
               <Text style={styles.cardInteractiveText}>Interactive</Text>
            </View>
         );
      }

      return( retval );
   }

   getDuration( starts, ends ) {
      let retval = null;

      if( starts && ends ) {
         const ms = moment(starts);
         const me = moment(ends);
         retval = me.diff( ms, 'minutes' );
      }

      return( retval );
   }

   goVideoChat(){
      const navigateAction = NavigationActions.navigate({
         routeName: 'VideoChat',
      });
      //this.props.navigation.dispatch(navigateAction);
   }

   render() {
      const card = this.props.item;
      return(
         <Card style={styles.card}>
            <CardItem style={{paddingBottom: 0}}>
               <Left style={styles.cardCategoryContainer}><Text style={styles.cardCategory}>{card.category}</Text></Left>
               <Right>{this.getInteractive(card.interactive)}</Right>
            </CardItem>
            <CardItem style={{paddingTop: 5}}>
               <View style={{width: '100%'}}>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Item style={{borderBottomWidth:0}}>
                     <Text style={styles.cardDuration}>{this.getDuration( card.starts, card.ends )} {this.t('minutes')}</Text>
                     <Right><Text style={styles.cardStartTime}>{moment(card.starts).format('h:mm a')}</Text></Right>
                  </Item>
               </View>
            </CardItem>
            <CardItem>
               <Left>
                  <Thumbnail small source={''}/>
                  <Text>{card.trainer}</Text>
               </Left>
            </CardItem>
            <CardItem>
               <TouchableOpacity style={styles.cardBottom} onPress={() => this.goVideoChat()}>
                  <Text style={this.bottomTextStyle}>{this.bottomText}</Text>
                  <Button full transparent={!this.sameDay} style={this.buttonStyle}><Text style={this.buttonTextStyle}>${card.price.toFixed(2)}</Text></Button>
               </TouchableOpacity>
            </CardItem>
         </Card>
      );
   }
}

class CalendarBarItem extends Component {
   isWeekend() {
      let retval = false;

      const weekday = moment( this.props.item ).format('d');
      if( weekday == 0 ) retval = true;

      return( retval );
   }

   getWeekendStyle() {
      return ( this.isWeekend() )? styles.itemWeekend : {};
   }

   getMonth() {
      var retval = ' ';

      if( this.props.showMonth ) {
         retval = moment( this.props.item ).format('MMM');
      }

      return( retval );
   }

   onPress() {
      if( this.props.onPress ) this.props.onPress( this.props.item, this.props.idx );
   }

   render() {
      const item = this.props.item;
      const active = ( this.props.active )? styles.itemContainerActive : {};
      const weekend = this.getWeekendStyle();
      return(
         <TouchableOpacity style={[styles.itemContainer, active]} onPress={this.onPress.bind(this)}>
            <Text style={styles.itemMonth}>{this.getMonth()}</Text>
            <Text style={[styles.itemMonthDay, weekend]}>{moment(item).format('DD')}</Text>
            <Text style={weekend}>{moment(item).format('ddd')}</Text>
         </TouchableOpacity>
      );
   }
}

class CalendarBar extends Component {
   constructor(props) {
      super(props);
   
      this.state = {
         min: null,
         max: null,
         days: [],
         current: moment().format(),
      };
   }

   componentWillReceiveProps( nextProps ) {
      this.prepare();
   }

   componentDidMount() {
      this.prepare();
   }

   prepare() {
      const {min, max} = this.getMinMaxDate(this.props.items);
      const days = this.getPeriodDays( min, max );

      this.setState({
         min: moment(min).format(),
         max: moment(max).format(),
         days,
         //current: moment(min).toDate(),
      });
   }

   getPeriodDays( startDate, endDate ) {
      let dates = [];

      if( startDate && endDate ) {
         let currDate = moment().startOf('day');
         let lastDate = moment(endDate).startOf('day');
         const dayDiff = lastDate.diff(currDate, 'days');
         if( dayDiff<0 || dayDiff < 14 ) {
            lastDate = currDate.clone();
            lastDate.add( 14, 'days' );
         }

         dates.push( currDate.clone().format() );
         while( currDate.add(1, 'days').diff(lastDate ) <= 0 ) {
            dates.push(currDate.clone().format());
         }
      }

      return dates;
   }

   getMinMaxDate( items ) {
      let retval = {
         min: new Date().getTime(),
         max: new Date().getTime(),
      };

      if( items && items.length > 0 ) {
         /*retval.min = Math.min.apply( Math, items.map( (item) => {
            let starts = null;
            try {
               starts = (item.starts)? new Date(item.starts).getTime() : new Date().getTime();
            }
            catch( e ) {
               starts = new Date().getTime();
            }
            return starts;
         }));*/

         retval.max = Math.max.apply( Math, items.map( (item) => {
            console.log(item.title, item.starts);
            let starts = null;
            try {
               starts = new Date(item.starts).getTime();
            }
            catch( e ) {
               starts = new Date().getTime();
            }
            return starts;
         }));
      }
      //console.log(items);
      console.log(retval);

      return( retval );
   }

   isActive( item ) {
      let retval = false;

      const src = moment(item);
      const current = moment(this.state.current);
      const format = 'YYYYMD';
      if( src.format(format) === current.format(format) ) {
         retval = true;
      }

      return( retval );
   }

   showMonth( item, index ) {
      let retval = false;

      if( index == 0 ) {
         retval = true;
      }
      else {
         const day = moment(item).format('D');
         if( day == 1 ) retval = true;
      }

      return( retval );
   }

   onPressItem( item, idx ) {
      this.setState({
         current: item,
      });
      if( this.props.onChangeCurrentDay ) this.props.onChangeCurrentDay( item, idx );
   }

   render() {
      const days = this.state.days;
      return(
         <View>
            <FlatList
               contentContainerStyle={styles.flatList}
               data={days}
               keyExtractor={(item) => (item.toString())}
               horizontal={true}
               currentDate={this.state.current}
               renderItem={({item, index}) => {
                  return( <CalendarBarItem 
                     item={item} 
                     idx={index}
                     active={this.isActive(item)}
                     showMonth={this.showMonth(item, index)}
                     onPress={this.onPressItem.bind(this)}
                  />);
               }}
            />
         </View>
      );
   }
}

class Calendar extends BaseScreen {
   constructor(props) {
      super(props);
   
      this.state = {
         currentDay: moment().format(),
      };
   }

   t( name, params={} ) {
      return( i18n.t(`Calendar.${name}`, params) );
   }

   componentWillMount() {
      this.props.setSidebar(INITIAL_STATE_USER.items);
   }

   componentDidMount() {
      this.props.getLessons();
   }

   onChangeCurrentDay( item, idx ) {
      this.setState({
         currentDay: item,
      });
   }

   getCards() {
      let retval = [];

      if( this.state.currentDay ) {
         const format = 'YYYYMD';
         const day = moment( this.state.currentDay ).format(format);
         const lessons = this.props.lesson.items.filter( (item)  => {
            const d = moment( item.starts ).format(format);
            return( d == day );
         });

         if( lessons.length > 0 ) {
            retval = lessons;
         }
      }

      return( retval );
   }

   /**
    * .sort( (a,b) => {
                     let retval = (a.starts>b.starts)? 1 : ( (a.starts<b.starts) -1 : 0 );
                     return retval;
                  })
    */

   render() {
      const cards = this.getCards();
      return (
         <Container style={styles.container}>
            <Header
               hasTabs
               title={this.t('header')}
               onPressMenu={this.onPressMenu.bind(this)}
            />
            <Content style={styles.content} contentContainerStyle={styles.contentContainer}>
               <CalendarBar 
                  items={this.props.lesson.items}
                  onChangeCurrentDay={this.onChangeCurrentDay.bind(this)}
               />
               <View style={styles.cardsContainer}>
                  {cards.map( (card, idx) => (
                     <CalendarCard 
                        key={idx} 
                        item={card} 
                        idx={idx}
                        navigation={this.props.navigation}
                     />
                  ))}
                  <Text> </Text>
               </View>
            </Content>

         </Container>
      );s
   }
}

const mapDispatchToProps = (dispatch) => ({
   openSidebar: () => dispatch( SideBarActions.sidebarOpen() ),
   closeSidebar: () => dispatch( SideBarActions.sidebarClose() ),
   setSidebar: (items) => dispatch( SideBarActions.sidebarSetItems(items) ),
   getLessons: () => dispatch( LessonActions.getLessonsRequest() ),
});

export default connect((state)=>({
   nav: state.nav,
   user: state.user,
   lesson: state.lesson,
}), mapDispatchToProps)(Calendar);
