import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, TouchableOpacity, } from 'react-native';
import {
   Container, Content, Text, View,
   Footer, FooterTab, Right,
   Button, Thumbnail, Icon,
   Form, Item, Label, Input, Picker, 
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import RNDatePicker from 'react-native-datepicker';
import moment from 'moment';

import i18n from '../i18n';

import styles from './styles/TrainerPostClassStyles';
import theme from '../themes/';

import BaseScreen from './BaseScreen';
import {Header} from '../components/Header';
import {Autocomplete} from '../components/Autocomplete';

import SideBarActions from '../redux/SideBarRedux';
import LessonActions from '../redux/LessonRedux';
import {getCategoryIdByName} from '../redux/LessonCategoryRedux';

const dateFormat = "MMMM D, YYYY h:mm a";

export class DatePicker extends Component {
   onDateChange( dateText, dateIso ) {
      if( this.props.onDateChange ) this.props.onDateChange( new Date(dateIso) );
   }

   render() {
      return(
         <RNDatePicker
            style={this.props.style}
            date={this.props.date}
            mode="datetime"
            placeholder="select date"
            format={dateFormat}
            minDate={moment().format(dateFormat)}
            maxDate={moment().add(1, 'years').format(dateFormat)}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={{
               dateText: {
                  fontSize: theme.fontSizeBase,
                  fontFamily: theme.fontFamily,
                  color: theme.brandPrimary,
               },
               dateInput: {
                  borderWidth: 0,
                  alignItems: 'flex-end',
               }
            }}
            onDateChange={this.onDateChange.bind(this)}
         />
      );
   }
}

class TrainerPostClass extends BaseScreen {
   constructor(props) {
      super(props);
   
      this.state = {
         categories: [],
         starts: new Date(),
         ends: new Date(),
         interactive: false,
         query: '',
         title: '',
         description: '',
         price: '3.99',
         maxSpots: '1',
      };
   }

   t( name, params={} ) {
      return( i18n.t(`TrainerPostClass.${name}`, params) );
   }

   getDurationItems() {
      return(['5 min', 'Female']);
   }

   submit() {
      const s = this.state;
      if( s.categories.length && s.title ) {
         const {firstName, lastName} = this.props.user.properties;
         this.props.createLesson({
            instructorName: `${firstName} ${lastName}`,
            durationInMins: moment(s.ends).diff( moment(s.starts), 'minutes'),
            sessionDesc: s.description,
            sessionTitle: s.title,
            sessionType: getCategoryIdByName( s.categories[0] ),
            sessionTime: moment(s.starts).format(),
            isInteractive: s.interactive,
            price: s.price,
         });
      }
      this.goHome();
   }

   goHome() {
      const navigateAction = NavigationActions.reset({
         index: 0,
         actions: [
            NavigationActions.navigate( {routeName: 'Calendar'} ),
         ],
      });
      this.props.navigation.dispatch(navigateAction);
   }

   onChangeInteractive( value ) {
      this.setState({
         interactive: value,
      });
   }

   getCategories() {
      return this.props.lessonCategory.items.map( (c,idx) => ( c.name ) );
   }

   onChangeCategories( categories ) {
      this.setState({
         categories
      });
   }

   getPriceList( sign1='$', sign2='.99' ) {
      const list = [0,1,2,3,4,5,6,7,8,9,15,20,25,29,35,39,45,49];
      return( list.map( (l, key) => (
         <Picker.Item key={key} label={`${sign1}${l}${sign2}`} value={`${l}${sign2}`}/>
      )) );
   }

   onChangePrice( price ) {
      this.setState({price});
   }

   getMaxSpotsList() {
      const list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
      return( list.map( (l, key) => (
         <Picker.Item key={key} label={l.toString()} value={l.toString()}/>
      )) );
   }

   onChangeMaxSpots( maxSpots ) {
      this.setState({maxSpots});
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

                  <Label style={styles.label}>{this.t('form.categoryLabel')}</Label>
                  <View style={[styles.item, {borderBottomWidth:2, borderColor:theme.inputBorderColor, marginBottom: 20}]}>
                     <Autocomplete 
                        data={this.getCategories()}
                        onChange={this.onChangeCategories.bind(this)}
                     />
                  </View>

                  <Label style={styles.labelFirst}>{this.t('form.titleLabel')}</Label>
                  <Item style={styles.item}>
                     <Input style={styles.input} placeholder={this.t('form.titlePlaceholder')} value={this.state.title} onChangeText={(title)=>{this.setState({title})}}/>
                  </Item>

                  <Label style={styles.label}>{this.t('form.descriptionLabel')}</Label>
                  <Item style={styles.item}>
                     <Input style={styles.input} placeholder={this.t('form.descriptionPlaceholder')} value={this.state.description} onChangeText={(description)=>{this.setState({description})}}/>
                  </Item>

                  <Item inlineLabel style={[styles.item,{paddingTop: 10,paddingBottom:30}]}>
                     <Label style={styles.label}>{this.t('form.interactiveLabel')}</Label>
                     <View style={{marginTop:20, flex:1, alignItems:'flex-end'}}>
                        <Switch 
                           value={this.state.interactive} 
                           onValueChange={this.onChangeInteractive.bind(this)}
                           thumbTintColor={theme.brandPrimary}
                           tintColor='#909090'
                        />
                     </View>
                  </Item>

                  <Item inlineLabel style={styles.item}>
                     <Label style={styles.labelInline}>{this.t('form.startsLabel')}</Label>
                     <DatePicker 
                        style={{flex: 1, height: 60, marginTop: 20}}
                        date={this.state.starts}
                        onDateChange={(date) => {this.setState({starts: date})}}
                     />
                  </Item>

                  <Item inlineLabel style={styles.item}>
                     <Label style={styles.labelInline}>{this.t('form.endsLabel')}</Label>
                     <DatePicker 
                        style={{flex: 1, height: 60, marginTop: 20}}
                        date={this.state.ends}
                        onDateChange={(date) => {this.setState({ends: date})}}
                     />
                  </Item>

                  <Item inlineLabel style={styles.item}>
                     <Label>{this.t('form.priceLabel')}</Label>
                     <Right>
                        <Picker
                           iosHeader="Select one"
                           headerBackButtonText="<"
                           textStyle={styles.pickerText}
                           mode="dropdown"
                           selectedValue={this.state.price}
                           onValueChange={this.onChangePrice.bind(this)}
                           style={styles.pickerUsual}
                        >
                           {this.getPriceList()}
                        </Picker>
                     </Right>
                  </Item>

                  <Item inlineLabel style={styles.item}>
                     <Label>{this.t('form.maxSpotsLabel')}</Label>
                     <Right>
                        <Picker
                           iosHeader="Select one"
                           headerBackButtonText="<"
                           textStyle={styles.pickerText}
                           mode="dropdown"
                           selectedValue={this.state.maxSpots}
                           onValueChange={this.onChangeMaxSpots.bind(this)}
                           style={styles.pickerUsual}
                        >
                           {this.getMaxSpotsList()}
                        </Picker>
                     </Right>
                  </Item>

               </Form>
            </Content>
            <Footer>
               <FooterTab>
                  <Button full style={styles.submit} onPress={this.submit.bind(this)}>
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
   createLesson: (data) => dispatch( LessonActions.createLessonRequest(data) ),
});

export default connect((state)=>({
   nav: state.nav,
   user: state.user,
   lessonCategory: state.lessonCategory,
}), mapDispatchToProps)(TrainerPostClass);
