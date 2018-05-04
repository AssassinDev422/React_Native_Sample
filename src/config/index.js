import { Text } from 'react-native';

// Allow/disallow font-scaling in app
Text.defaultProps.allowFontScaling = true;

if (__DEV__) {
}

module.exports = {
   debug: __DEV__,
   email: '',
   backend: {
      type: 'remote',
      local: {
         url: 'http://127.0.0.1:3001/api/'
      },
      remote: {
         url: 'http://35.230.169.249:9090/graphql'
      }
   }
};
