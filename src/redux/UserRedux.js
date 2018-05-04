import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
   createTrainerRequest: ['properties'],
   createTrainerSuccess: ['data'],
   createTrainerFailure: null,

   createUserRequest: ['properties'],
   createUserSuccess: ['data'],
   createUserFailure: null,
});

export const UserTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
   loaded: false,
   fetching: null,
   error: null,
   properties: Immutable({
      id: 0,
      type: 1, //trainer/user
      firstName: 'John',
      lastName: 'Smith',
      age: null,
      sex: null,
      email: null,
   }),
});

/************************* Trainer *********************************/

export const createTrainerRequest = ( state, action ) => {
   const newState = state.merge({ fetching: true });
   return newState;
};
export const createTrainerSuccess = ( state, action ) => {
   const {data} = action;
   const properties = (data)? data : INITIAL_STATE.properties;
   return state.merge( {fetching: false, loaded: true, properties}, {deep: true} );
};
export const createTrainerFailure = ( state ) => {
   return state.merge({ fetching: false, error: true });
};

/************************* User *********************************/

export const createUserRequest = ( state, action ) => {
   const newState = state.merge({ fetching: true });
   return newState;
};
export const createUserSuccess = ( state, action ) => {
   const {user} = action;
   const properties = (user)? user : INITIAL_STATE.properties;
   return state.merge( {fetching: false, loaded: true, properties}, {deep: true} );
};
export const createUserFailure = ( state ) => {
   return state.merge({ fetching: false, error: true });
};

export const reducer = createReducer( INITIAL_STATE, {
   [Types.CREATE_TRAINER_REQUEST]: createTrainerRequest,
   [Types.CREATE_TRAINER_SUCCESS]: createTrainerSuccess,
   [Types.CREATE_TRAINER_FAILURE]: createTrainerFailure,

   [Types.CREATE_USER_REQUEST]: createUserRequest,
   [Types.CREATE_USER_SUCCESS]: createUserSuccess,
   [Types.CREATE_USER_FAILURE]: createUserFailure,
});
