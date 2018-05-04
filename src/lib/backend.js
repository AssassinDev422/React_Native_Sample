import queryString from 'query-string';
require('regenerator-runtime/runtime');
import RNFetchBlob from 'react-native-fetch-blob';
import CONFIG from '../config';

const trainerFields = {
   id: 'id',
   firstName: 'firstName',
   lastName: 'lastName',
};
function adoptTrainerField( name ) {

}

function encode( text ) {
   return encodeURIComponent(text);
}

export class Backend {
   initialize( token ) {
      this._sessionToken = ( token==null )? null : token;
      this.apiBaseUrl = ( CONFIG.backend.type=='remote')? CONFIG.backend.remote.url : CONFIG.backend.local.url;
   }

   get trainerFields() {
      return( 'id,firstName,lastName,age,sex,location,email,desc,certification,fitnessType,city,country,reviewInfoID,phoneNo,facebookId,displayImage' );
   }

   get userFields() {
      return( 'id,firstName,lastName,age,sex,email,city,country,phoneNo,facebookId' );
   }

   get lessonFields() {
      return( 'id,instructorName,durationInMins,isInteractive,sessionDesc,instructorInfoID,sessionType,difficultyLevel,tagList,previewVideoUrl,SessionUsersEnrolled,sessionTime,sessionTitle,price' );
   }

   async getTrainer( id ) {
      return( 
         await this._fetch({
            method: 'GET',
            url: this.apiBaseUrl + `?query={instructor(id:"${id}"){${this.trainerFields}}}`,
         }).then((res) => {
            if ((res.status === 200 || res.status === 201) ||
               (res.status === 400 && res.code === 209)) {
               return res.json;
            } else {
               throw new Error({code: res.statusCode, error: res.message})
            }
         }).catch((error) => {
            throw(error);
         })
      );
   }

   async createTrainer( data={firstName:'', lastName:'', email: '', password: ''} ) {
      return( 
         await this._fetch({
            method: 'GET',
            url: this.apiBaseUrl + `?query=mutation+_{createInstructor(firstName:"${data.firstName}",lastName:"${data.lastName}",email:"${data.email}",password:"${data.password}"){${this.trainerFields}}}`,
         }).then((res) => {
            if ((res.status === 200 || res.status === 201) ||
               (res.status === 400 && res.code === 209)) {
               return res.json;
            } else {
               throw new Error({code: res.statusCode, error: res.message})
            }
         }).catch((error) => {
            throw(error);
         })
      );
   }

   async getUser( id ) {
      return( 
         await this._fetch({
            method: 'GET',
            url: this.apiBaseUrl + `?query={user(id:"${id}"){${this.userFields}}}`,
         }).then((res) => {
            if ((res.status === 200 || res.status === 201) ||
               (res.status === 400 && res.code === 209)) {
               return res.json;
            } else {
               throw new Error({code: res.statusCode, error: res.message})
            }
         }).catch((error) => {
            throw(error);
         })
      );
   }

   async createUser( data={} ) {
      return( 
         await this._fetch({
            method: 'GET',
            url: this.apiBaseUrl + `?query=mutation+_{createUser(firstName:"${data.firstName}",lastName:"${data.lastName}"){${this.userFields}}}`,
         }).then((res) => {
            if ((res.status === 200 || res.status === 201) ||
               (res.status === 400 && res.code === 209)) {
               return res.json;
            } else {
               throw new Error({code: res.statusCode, error: res.message})
            }
         }).catch((error) => {
            throw(error);
         })
      );
   }

   async getLesson( id ) {
      return( 
         await this._fetch({
            method: 'GET',
            url: this.apiBaseUrl + `?query={session(id:"${id}"){${this.lessonFields}}}`,
         }).then((res) => {
            if ((res.status === 200 || res.status === 201) ||
               (res.status === 400 && res.code === 209)) {
               return res.json;
            } else {
               throw new Error({code: res.statusCode, error: res.message})
            }
         }).catch((error) => {
            throw(error);
         })
      );
   }

   async getLessons() {
      return( 
         await this._fetch({
            method: 'GET',
            url: this.apiBaseUrl + `?query={sessions{${this.lessonFields}}}`,
         }).then((res) => {
            if ((res.status === 200 || res.status === 201) ||
               (res.status === 400 && res.code === 209)) {
               return res.json;
            } else {
               throw new Error({code: res.statusCode, error: res.message})
            }
         }).catch((error) => {
            throw(error);
         })
      );
   }

   /**
    * Create new lesson(session)
    * @param  {Object} data
    *         sessionType [int] categoryID
    *         sessionTime [string] starts
    * @return {[type]}      [description]
    */
   async createLesson( data={} ) {
      return( 
         await this._fetch({
            method: 'GET',
            url: this.apiBaseUrl + `?query=mutation+_{createSession(instructorName:"${data.instructorName}",instructorInfoID:0,durationInMins:${data.durationInMins},sessionDesc:"${data.sessionDesc}",sessionTitle:"${data.sessionTitle}",sessionType:${data.sessionType},sessionTime:"${encode(data.sessionTime)}",isInteractive:${data.isInteractive},price:${data.price}){${this.lessonFields}}}`,
         }).then((res) => {
            if ((res.status === 200 || res.status === 201) ||
               (res.status === 400 && res.code === 209)) {
               return res.json;
            } else {
               throw new Error({code: res.statusCode, error: res.message})
            }
         }).catch((error) => {
            throw(error);
         })
      );
   }

   /*
    * @returns object:
    *  {code: response.code,
    *   status: response.status,
    *   json: response.json()
    * }
   */
   async _fetch( opts ) {
      opts = {
         method: 'GET',
         url: null,
         body: null,
         callback: null,
         ...opts,
      };

      var reqOpts = {
         method: opts.method,
         headers: {}
      }

      if( this._sessionToken ) {
         reqOpts.headers['Authorization'] = 'Bearer ' + this._sessionToken;
      }

      if( opts.method === 'POST' || opts.method === 'PUT' ) {
         reqOpts.headers['Accept'] = 'application/json';
         reqOpts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      }

      if( opts.body ) {
         reqOpts.body = queryString.stringify(opts.body);
      }

      let url = opts.url;
      let res = {};

      let response = await fetch(url, reqOpts);
      res.status = response.status;
      res.code = response.code;

      return response.json().then( (json) => {
         res.json = json;
         //console.log( JSON.stringify(res) );
         return res;
      }).catch( (error) => {
         res.error = error;
         //console.log( JSON.stringify(res) );
         throw( res );
      });
   }
}

export let backend = new Backend();
