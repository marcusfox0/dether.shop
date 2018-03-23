import tr from '../../../translate';
import { isZoneShopOpen } from '../../../helpers';

export default {
  address: {
    tranform: val => val,
    test: val =>
      !!(val && val.lat && val.lng && val.countryId && val.countryId.length && val.postalCode
      && isZoneShopOpen(val.countryId)),
    fillInfos: () => null,
    errorMsg: () => tr('add.form.inputs.address.error')
  },
  cat: {
    tranform: val => (val ? val.substring(0, 16) : ''),
    test: val => val && val.length && val.length <= 16,
    fillInfos: () => null,
    errorMsg: () => tr('add.form.inputs.cat.error')
  },
  name: {
    tranform: val => (val ? val.substring(0, 16) : ''),
    test: val => val && val.length && val.length <= 16,
    fillInfos: () => null,
    errorMsg: () => tr('add.form.inputs.name.error')
  },
  description: {
    tranform: val => (val.substring(0, 32) || ''),
    test: val => val && val.length && val.length <= 32,
    fillInfos: () => null,
    errorMsg: () => tr('add.form.inputs.description.error')
  },
  opening: {
    tranform: val => (val || ''),
    test: str => {
      const hours = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUV';
      let idx = 0;
      for (let i = 0; i < str.length;) {
        const testClose = str[i] === '0';
        const testOpen = hours.includes(str[i]) && hours.includes(str[i + 1]);
        if (!testClose && !testOpen) {
          return false;
        }
        idx += 1;
        i += testClose ? 1 : 2;
      }
      return idx === 7;
    },
    fillInfos: () => null,
    errorMsg: () => tr('add.form.inputs.opening.error')
  }
};
