import {
  NativeModules,
  NativeEventEmitter,
  EmitterSubscription,
} from 'react-native';

const {TerminalModule} = NativeModules;

type TerminalModuleType = {
  runCommand: (command: string) => void;
  addEventListener(
    event: TerminalEvent,
    listener: (data: {outputText: string}) => void,
  ): EmitterSubscription;
  removeSubscription(subscription: EmitterSubscription): void;
};

const emitter = new NativeEventEmitter(TerminalModule);

export enum TerminalEvent {
  CommandOutput = 'CommandOutput',
}

function addEventListener(
  event: TerminalEvent,
  listener: (data: {outputText: string}) => void,
) {
  return emitter.addListener(event, listener);
}

export const Terminal: TerminalModuleType = {
  runCommand: TerminalModule.runCommand,
  addEventListener,
  removeSubscription: emitter.removeSubscription,
};
