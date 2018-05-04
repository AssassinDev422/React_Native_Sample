import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
   sidebarOpen: null,
   sidebarClose: null,
   sidebarActivateItem: ['route'],
   sidebarSetItems: ['items'],
});

import i18n from '../i18n';
function t( name, params ) {
   return( i18n.t(`Sidebar.${name}`, params) );
}

export const SideBarTypes = Types;
export default Creators;

export const INITIAL_STATE_USER = Immutable({
   opened: false,
   items: Immutable([
      {
         title: t('user.home'),
         route: 'Calendar',
         active: true,
      },
      /*{
         title: t('user.myBookedClasses'),
         //route: 'MyBookedClasses',
         route: 'DummyScreen',
         active: false,
      },
      {
         title: t('user.requestClass'),
         route: 'RequestClass',
         active: false,
      },
      {
         title: t('user.settings'),
         //route: 'Settings',
         route: 'DummyScreen',
         active: false,
      },
      {
         title: t('user.sendFeedback'),
         //route: 'SendFeedback',
         route: 'DummyScreen',
         active: false,
      },
      {
         title: t('user.howto'),
         //route: 'Howto',
         route: 'DummyScreen',
         active: false,
      },*/
      {
         title: t('user.logout'),
         route: 'Onboarding',
         active: false,
      },
   ]),
});

export const INITIAL_STATE_TRAINER = Immutable({
   opened: false,
   items: Immutable([
      {
         title: t('trainer.home'),
         //route: 'TrainerHome',
         route: 'DummyScreen',
         active: true,
      },
      /*{
         title: t('trainer.myScheduledClasses'),
         //route: 'TrainerScheduledClasses',
         route: 'DummyScreen',
         active: false,
      },*/
      {
         title: t('trainer.postClass'),
         route: 'TrainerPostClass',
         active: false,
      },
      {
         title: t('trainer.logout'),
         route: 'Onboarding',
         active: false,
      },
   ]),
});

function deactivateAllItems( state ) {
   const items = state.items.map( (item)=>({
      ...item,
      active: false,
   }));
   return( state.set( 'items', items ) );
}

function activateItemByRoute( state, route ) {
   const items = state.items.map( (item)=>{
      const active = item.route === route;
      return {
         ...item,
         active,
      };
   });
   return( state.set( 'items', items ) );
}

export const open = ( state, action ) => {
   const newState = state.merge({ opened: true });
   return newState;
};
export const close = ( state, action ) => {
   const newState = state.merge({ opened: false });
   return newState;
};
export const activateItem = ( state, action ) => {
   const {route} = action;

   let newState = deactivateAllItems(state);
   newState = activateItemByRoute( newState, route );

   return newState;
};
export const setItems = ( state, action ) => {
   const {items} = action;
   const newState = state.set( 'items', items );
   return newState;
};

export const reducer = createReducer( INITIAL_STATE_USER, {
   [Types.SIDEBAR_OPEN]: open,
   [Types.SIDEBAR_CLOSE]: close,
   [Types.SIDEBAR_ACTIVATE_ITEM]: activateItem,
   [Types.SIDEBAR_SET_ITEMS]: setItems,
});
