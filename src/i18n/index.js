'use strict'

import I18n, {getLanguages} from 'react-native-i18n';
import en from './en';

import moment from 'moment';
require('moment/locale/af');
require('moment/locale/ar');
require('moment/locale/ar-dz');
require('moment/locale/ar-kw');
require('moment/locale/ar-ly');
require('moment/locale/ar-ma');
require('moment/locale/ar-sa');
require('moment/locale/ar-tn');
require('moment/locale/az');
require('moment/locale/be');
require('moment/locale/bg');
require('moment/locale/bm');
require('moment/locale/bn');
require('moment/locale/bo');
require('moment/locale/br');
require('moment/locale/bs');
require('moment/locale/ca');
require('moment/locale/cs');
require('moment/locale/cv');
require('moment/locale/cy');
require('moment/locale/da');
require('moment/locale/de');
require('moment/locale/de-at');
require('moment/locale/de-ch');
require('moment/locale/dv');
require('moment/locale/el');
require('moment/locale/en-au');
require('moment/locale/en-ca');
require('moment/locale/en-gb');
require('moment/locale/en-ie');
require('moment/locale/en-nz');
require('moment/locale/eo');
require('moment/locale/es');
require('moment/locale/es-do');
require('moment/locale/es-us');
require('moment/locale/et');
require('moment/locale/eu');
require('moment/locale/fa');
require('moment/locale/fi');
require('moment/locale/fo');
require('moment/locale/fr');
require('moment/locale/fr-ca');
require('moment/locale/fr-ch');
require('moment/locale/fy');
require('moment/locale/gd');
require('moment/locale/gl');
require('moment/locale/gom-latn');
require('moment/locale/gu');
require('moment/locale/he');
require('moment/locale/hi');
require('moment/locale/hr');
require('moment/locale/hu');
require('moment/locale/hy-am');
require('moment/locale/id');
require('moment/locale/is');
require('moment/locale/it');
require('moment/locale/ja');
require('moment/locale/jv');
require('moment/locale/ka');
require('moment/locale/kk');
require('moment/locale/km');
require('moment/locale/kn');
require('moment/locale/ko');
require('moment/locale/ky');
require('moment/locale/lb');
require('moment/locale/lo');
require('moment/locale/lt');
require('moment/locale/lv');
require('moment/locale/me');
require('moment/locale/mi');
require('moment/locale/mk');
require('moment/locale/ml');
require('moment/locale/mr');
require('moment/locale/ms');
require('moment/locale/ms-my');
require('moment/locale/mt');
require('moment/locale/my');
require('moment/locale/nb');
require('moment/locale/ne');
require('moment/locale/nl');
require('moment/locale/nl-be');
require('moment/locale/nn');
require('moment/locale/pa-in');
require('moment/locale/pl');
require('moment/locale/pt');
require('moment/locale/pt-br');
require('moment/locale/ro');
require('moment/locale/ru');
require('moment/locale/sd');
require('moment/locale/se');
require('moment/locale/si');
require('moment/locale/sk');
require('moment/locale/sl');
require('moment/locale/sq');
require('moment/locale/sr');
require('moment/locale/sr-cyrl');
require('moment/locale/ss');
require('moment/locale/sv');
require('moment/locale/sw');
require('moment/locale/ta');
require('moment/locale/te');
require('moment/locale/tet');
require('moment/locale/th');
require('moment/locale/tlh');
require('moment/locale/tl-ph');
require('moment/locale/tr');
require('moment/locale/tzl');
require('moment/locale/tzm');
require('moment/locale/tzm-latn');
require('moment/locale/uk');
require('moment/locale/ur');
require('moment/locale/uz');
require('moment/locale/uz-latn');
require('moment/locale/vi');
require('moment/locale/x-pseudo');
require('moment/locale/yo');
require('moment/locale/zh-cn');
require('moment/locale/zh-hk');
require('moment/locale/zh-tw');

I18n.fallbacks = true;
I18n.defaultLocale = 'en';
I18n.translations = {
   en: en,
};

moment.locale('en');
getLanguages().then( (languages) => {
   try{
      const [lang1, lang2] = languages[0].split(/[-_]{1}/);
      moment.locale( lang1 );
   }
   catch(e) {
      moment.locale('en');
   }
});

export const m = moment;
export default I18n;
