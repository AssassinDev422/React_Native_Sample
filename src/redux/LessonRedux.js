import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import moment from 'moment';

import {geCategoryNameById} from './LessonCategoryRedux';

const { Types, Creators } = createActions({
   lessonSetItems: ['items'],

   getLessonsRequest: null,
   getLessonsSuccess: ['data'],
   getLessonsFailure: null,

   createLessonRequest: ['properties'],
   createLessonSuccess: ['item'],
   createLessonFailure: null,
});

export const LessonTypes = Types;
export default Creators;

function itemFactory( category, title, interactive, starts, ends, trainer, trainerPhoto, price ) {
   return({
      id: 0,
      caregoryId: 0,
      category,
      title,
      description: '',
      interactive,
      starts,
      ends,
      trainerId: null,
      trainer,
      trainerPhoto,
      price,
   });
}

const photoJimSmith = require('../images/trainers/JimSmith.jpg');
const photoSarahJones = require('../images/trainers/SarahJones.jpg');
export const INITIAL_STATE = Immutable({
   fetching: null,
   error: null,
   items: [],
   itemsDummy: Immutable([
      itemFactory( 'Yoga', 'Sivananda Yoga', true, new Date(2018,1,12,10,30),  new Date(2018,1,12,11,0), 'Jim Smith', photoJimSmith, '3.99' ),
      itemFactory( 'Dance', 'Hip-hop Dance', false, new Date(2018,1,12,12,30),  new Date(2018,1,12,13,30), 'Sarah Jones', photoSarahJones, '3.99' ),

      itemFactory( 'Yoga', 'Sivananda Yoga', false, new Date(2018,1,25,10,30),  new Date(2018,1,25,11,0), 'Jim Smith', photoJimSmith, '3.99' ),
      itemFactory( 'Dance', 'Hip-hop Dance', false, new Date(2018,2,3,12,30),  new Date(2018,2,3,13,30), 'Sarah Jones', photoSarahJones, '3.99' ),
   ]),
});


export const setItems = ( state, action ) => {
   const {items} = action;
   const newState = state.set( 'items', items );
   return newState;
};

function fixDate( date ) {
   return decodeURIComponent( date.replace(' ', '+') );
}

const emptyPhoto = require('../images/photo.png');
function adoptLessonItem( item ) {
   let starts = null, ends = null;
   const duration = ( item.durationInMins>0 )? item.durationInMins : 30;
   if( item.sessionTime ) {
      starts = moment( fixDate(item.sessionTime) ).format();
      ends = moment(starts).add(item.durationInMins, 'minutes').format();
   }
   return {
      categoryId: item.sessionType,
      category: (item.sessionType > 0)? geCategoryNameById(item.sessionType) : '',
      title: item.sessionTitle,
      description: item.sessionDesc,
      interactive: item.isInteractive,
      starts: starts,
      ends: ends,
      trainerId: item.instructorInfoID,
      trainer: item.instructorName,
      trainerPhoto: emptyPhoto,
      price: item.price,
   };
}
function adoptLessonItems( items ) {
   return items.map( (item, idx) => adoptLessonItem(item) );
}

export const getLessonsRequest = ( state, action ) => {
   const newState = state.merge({ fetching: true });
   return newState;
};
export const getLessonsSuccess = ( state, action ) => {
   const {data} = action;
   const items = (data)? data : INITIAL_STATE.items;
   return state.merge( {fetching: false, items: adoptLessonItems(items)}, {deep: true} );
};
export const getLessonsFailure = ( state ) => {
   return state.merge({ fetching: false, error: true });
};

export const createLessonRequest = ( state, action ) => {
   const newState = state.merge({ fetching: true });
   return newState;
};
export const createLessonSuccess = ( state, action ) => {
   return state.merge( {fetching: false} );
};
export const createLessonFailure = ( state ) => {
   return state.merge({ fetching: false, error: true });
};

export const reducer = createReducer( INITIAL_STATE, {
   [Types.LESSON_SET_ITEMS]: setItems,

   [Types.GET_LESSONS_REQUEST]: getLessonsRequest,
   [Types.GET_LESSONS_SUCCESS]: getLessonsSuccess,
   [Types.GET_LESSONS_FAILURE]: getLessonsFailure,

   [Types.CREATE_LESSON_REQUEST]: createLessonRequest,
   [Types.CREATE_LESSON_SUCCESS]: createLessonSuccess,
   [Types.CREATE_LESSON_FAILURE]: createLessonFailure,
});
