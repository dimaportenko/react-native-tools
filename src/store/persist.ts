import AsyncStorage from '@react-native-async-storage/async-storage';
import {BashCommand} from './BashCommand';
import {Project} from './Project';
import {StorageController} from 'mobx-persist-store/lib/esm2017/types';
import {MMKV} from 'react-native-mmkv';
import {PathPicker} from '../native/pathpicker';

const mmkvPath = `${PathPicker.getApplicationSupportDirectoryPath()}/mmkv/`;

const storage = new MMKV({
  id: 'mmkv.default',
  path: mmkvPath,
});

type Class = {new (...args: any[]): any};
const modelMap = new Map<string, Class>([
  ['BashCommand', BashCommand],
  ['Project', Project],
]);

// AsyncStorage.clear(error => {
//   console.warn(error);
// });

export const persistStore: StorageController = {
  setItem: (__name: string, content: Object) => {
    return new Promise((resolve, reject) => {
      try {
        let objectifyMap = (
          myMap: Map<string, Object>,
        ): Record<string, Object> => {
          return Array.from(myMap).reduce<Record<string, Object>>(
            (accumulated, [key, value]) => {
              if (value instanceof Map) {
                accumulated[key] = objectifyMap(value);
              } else {
                accumulated[key] = value;
              }

              return accumulated;
            },
            {},
          );
        };

        let replacer = (__name: string, value: Object) => {
          if (value && value.constructor === Map) {
            return objectifyMap(value);
          } else {
            return value;
          }
        };

        // console.log('content', content);
        let result = JSON.stringify(content, replacer);

        storage.set(__name, result);

        resolve();
      } catch (error) {
        console.warn(error);
        reject(error);
      }
    });
  },
  removeItem: storage.delete,
  getItem: (key: string) => {
    return new Promise(async resolve => {
      let item = await storage.getString(key);
      item = item ?? '{}';

      let reviver = (__name: string, value: any): Object => {
        if (__name.length === 0) return value;

        if (value && typeof value === 'object' && !Array.isArray(value)) {
          for (let [className, Class] of modelMap.entries()) {
            if (value.className === className) {
              return Object.assign(new Class(), value);
            }
          }

          return new Map(Object.entries(value));
        }

        return value;
      };

      let revivedItem = JSON.parse(item as string, reviver);

      resolve(revivedItem);
    });
  },
};
