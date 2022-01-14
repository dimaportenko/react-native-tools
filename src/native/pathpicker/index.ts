import {NativeModules} from 'react-native';

const {PathPicker: PathPickerModule} = NativeModules;

type PathPickerType = {
  getDirectoryPath: () => Promise<string>;
};

export const PathPicker: PathPickerType = {
  ...PathPickerModule,
};
