import React, { Component } from 'react';
import { TouchableOpacity, } from 'react-native';
import {
   Text, View, Icon,
   Item, Input, 
} from 'native-base';

import styles from './styles/AutocompleteStyles';

export class AutocompleteSelectedItem extends Component {
   onPress() {
      if( this.props.onDelete ) this.props.onDelete( this.props.text );
   }

   render() {
      return(
         <View style={styles.selectedItemContainer}>
               <Text style={styles.selectedItemText}>{this.props.text}</Text>
               <TouchableOpacity onPress={this.onPress.bind(this)}>
                  <Icon name="close-circle" style={styles.selectedItemIcon}/>
               </TouchableOpacity>
         </View>
      );
   }
}

export class AutocompleteItem extends Component {
   onPress() {
      if( this.props.onPress ) this.props.onPress( this.props.text );
   }

   render() {
      return(
         <Item inlineLabel style={{height: 60}}>
            <TouchableOpacity onPress={this.onPress.bind(this)}>
               <Text>{this.props.text}</Text>
            </TouchableOpacity>
         </Item>
      );
   }
}

export class Autocomplete extends Component {
   constructor(props) {
      super(props);
   
      this.state = {
         selectedItems: [],
         text: '',
         itemsVisible: false,
      };
   }

   onPressItem( text ) {
      let selectedItems = this.state.selectedItems.slice(0);
      selectedItems.push( text );
      this.setState({
         selectedItems: selectedItems,
         text: '',
      }, ()=>{
         if( this.props.onChange ) this.props.onChange( this.state.selectedItems );
      });
   }

   onDeleteItem( text ) {
      const newState = this.state.selectedItems.filter( (item) => (item !== text) );
      this.setState({
         selectedItems: newState,
      }, ()=>{
         if( this.props.onChange ) this.props.onChange( this.state.selectedItems );
      });
   }

   getItems( text ) {
      let items = [];
      if( this.state.itemsVisible && text ) {
            const regex = new RegExp( `${text.trim()}`, 'i' );
            items = this.props.data.filter( (item) => item.search( regex) >= 0 );
      }
      const styleContainer = ( items.length>0 )? {marginTop:-10, marginBottom: 30} : {};
      return(
         <View style={styleContainer}>
            {items.map( (item, idx) => (
               <AutocompleteItem  
                  key={idx} 
                  text={item} 
                  idx={idx} 
                  onPress={this.onPressItem.bind(this)}
               />
            ))}
         </View>
      );
   }

   render() {
      return(
         <View>
            <View style={styles.container}>
               {this.state.selectedItems.map( (item, idx) => (
                  <AutocompleteSelectedItem 
                     key={idx}
                     text={item}
                     onDelete={this.onDeleteItem.bind(this)}
                  />
               ))}
               <Input 
                  style={styles.input} 
                  placeholder='Ex. Yoga' 
                  value={this.state.text} 
                  onChangeText={(text) => this.setState({text})}
                  onFocus={()=>{this.setState({itemsVisible:true})}}
                  onBlur={()=>{this.setState({itemsVisible:false})}}
               />
            </View>
            { this.getItems(this.state.text) }
         </View>
      );
   }
}
