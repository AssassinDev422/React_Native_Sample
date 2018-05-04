import {put, call} from 'redux-saga/effects';
import UserActions from '../redux/UserRedux';
import BackendFactory from '../lib/backendFactory';

export function * createTrainer( action ) {
   const {properties} = action;

   const response = yield call( ()=> BackendFactory().createTrainer(properties) );
   const {data} = response;
   //console.log('====== createTrainer', response);

   if( data ) {
      yield put( UserActions.createTrainerSuccess( data.createInstructor ) );
   }
   else {
      yield put( UserActions.createTrainerFailure() );
   }

   return( data );
}

export function * createUser( action ) {
   const {properties} = action;

   const response = yield call( ()=> BackendFactory().createUser(properties) );
   const {data} = response;

   if( data ) {
      yield put( UserActions.createUserSuccess(data) );
   }
   else {
      yield put( UserActions.createUserFailure() );
   }

   return( data );
}
