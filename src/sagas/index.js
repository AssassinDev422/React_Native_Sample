import { takeLatest, all } from 'redux-saga/effects';
//import FixtureAPI from '../services/FixtureApi';
import DebugConfig from '../config/DebugConfig';

import { StartupTypes } from '../redux/StartupRedux';
import { UserTypes } from '../redux/UserRedux';
import { LessonTypes } from '../redux/LessonRedux';
import { SideBarTypes } from '../redux/SideBarRedux';

import { openSideBar, closeSideBar } from './SideBarSagas';
import { createTrainer } from './UserSagas';
import { createLesson, getLessons } from './LessonSagas';

export default function * root() {
   yield all([
      takeLatest( SideBarTypes.SIDEBAR_OPEN, openSideBar ),
      takeLatest( SideBarTypes.SIDEBAR_CLOSE, closeSideBar ),

      takeLatest( UserTypes.CREATE_TRAINER_REQUEST, createTrainer ),

      takeLatest( LessonTypes.CREATE_LESSON_REQUEST, createLesson ),
      takeLatest( LessonTypes.GET_LESSONS_REQUEST, getLessons ),
   ])
}
