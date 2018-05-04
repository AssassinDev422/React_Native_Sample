import {backend} from './backend';

export default function BackendFactory( token=null ) {
   backend.initialize(token);
   return( backend );
}
