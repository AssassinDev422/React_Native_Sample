
export function log( message, properties ) {
   if( __DEV__ ) {
      console.log( message, properties );
   }
}

export function warn( message, properties ) {
   if( __DEV__ ) {
      console.warn( message, properties );
   }
}

export function error( error, message, properties ) {
   if( __DEV__ ) {
      console.error( message, properties );
   }
}
