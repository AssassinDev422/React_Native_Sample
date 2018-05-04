import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
   lessonCategorySetItems: ['items'],
});

export const LessonCategoryTypes = Types;
export default Creators;

export function geCategoryNameById( id ) {
   let retval = null;

   const items = INITIAL_STATE.items;
   if( items ) {
      for( let i=0; i<items.length; i++ ) {
         if( items[i].id == id ) {
            retval = items[i].name;
            break;
         }
      }
   }

   return( retval );
}
export function getCategoryIdByName( name ) {
   let retval = null;

   const items = INITIAL_STATE.items;
   if( items ) {
      for( let i=0; i<items.length; i++ ) {
         if( items[i].name == name ) {
            retval = items[i].id;
            break;
         }
      }
   }

   return( retval );
}

export const INITIAL_STATE = Immutable({
   items: Immutable([
      { id: 0, name: 'None' },

      { id: 10, name: 'Yoga' },
      { id: 11, name: 'Hatha Yoga' },
      { id: 12, name: 'Kundalini Yoga' },
      { id: 13, name: 'Fast Yoga' },

      { id: 101, name: 'Meditation' },
      { id: 102, name: 'Tm Meditation' },

      { id: 201, name: 'Dance' },
      { id: 202, name: 'Hip Hop' },
      { id: 203, name: 'Zumba' },

      { id: 301, name: 'Cardio' },
      { id: 302, name: 'Hiit' },
   ]),
});

export const setItems = ( state, action ) => {
   const {items} = action;
   const newState = state.set( 'items', items );
   return newState;
};

export const reducer = createReducer( INITIAL_STATE, {
   [Types.LESSON_CATEGORY_SET_ITEMS]: setItems,
});
