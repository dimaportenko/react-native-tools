import {NativeModules} from 'react-native';

const {TerminalModule} = NativeModules;

type TerminalModuleType = {
  runCommand: (command: string) => void;
};

export const Terminal: TerminalModuleType = TerminalModule;
