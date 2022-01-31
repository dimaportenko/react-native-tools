import {NativeModules} from 'react-native';

const {PathPicker: PathPickerModule} = NativeModules;

type PathPickerType = {
  getDirectoryPath: () => Promise<string>;
};

export const PathPicker: PathPickerType = {
  ...PathPickerModule,
};

export const usePathPicker = () => {
  const getDirectoryPath = () => {
    try {
      return PathPicker.getDirectoryPath();
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  return {
    getDirectoryPath,
  };
};
