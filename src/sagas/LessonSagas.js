import {put, call} from 'redux-saga/effects';
import LessonActions from '../redux/LessonRedux';
import BackendFactory from '../lib/backendFactory';

export function * getLessons( action ) {

   const response = yield call( ()=> BackendFactory().getLessons() );
   const {data} = response;
   //console.log('====== getLessons', response);

   if( data ) {
      yield put( LessonActions.getLessonsSuccess( data.sessions ) );
   }
   else {
      yield put( LessonActions.getLessonsFailure() );
   }

   return( data );
}

export function * createLesson( action ) {
   const {properties} = action;

   const response = yield call( ()=> BackendFactory().createLesson(properties) );
   const {data} = response;
   //console.log('====== createLesson', response);

   if( data ) {
      yield put( LessonActions.createLessonSuccess( data.createSession ) );
   }
   else {
      yield put( LessonActions.createLessonFailure() );
   }

   return( data );
}
