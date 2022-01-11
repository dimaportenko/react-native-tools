import {
  NativeModules,
  NativeEventEmitter,
  EmitterSubscription,
} from 'react-native';

const {TerminalModule} = NativeModules;

type TerminalModuleType = {
  stopCommand: () => void;
  runCommand: (command: string) => void;
  addEventListener(
    event: TerminalEvent,
    listener: (data: {outputText: string}) => void,
  ): EmitterSubscription;
  removeSubscription(subscription: EmitterSubscription): void;
};

const emitter = new NativeEventEmitter(TerminalModule);

export enum TerminalEvent {
  EVENT_COMMAND_OUTPUT = 'EVENT_COMMAND_OUTPUT',
  EVENT_COMMAND_FINISHED = 'EVENT_COMMAND_FINISHED',
}

function addEventListener(
  event: TerminalEvent,
  listener: (data: {outputText: string}) => void,
) {
  return emitter.addListener(event, listener);
}

export const Terminal: TerminalModuleType = {
  runCommand: TerminalModule.runCommand,
  stopCommand: TerminalModule.stopCommand,
  addEventListener,
  removeSubscription: emitter.removeSubscription,
};
