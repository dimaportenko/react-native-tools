import {
  NativeModules,
  NativeEventEmitter,
  EmitterSubscription,
} from 'react-native';

const {TerminalModule} = NativeModules;

type TerminalModuleType = {
  stopCommand: (key: string) => void;
  runCommand: (command: string, key: string) => void;
  addEventListener(
    event: TerminalEvent,
    listener: (data: {outputText: string; key: string}) => void,
  ): EmitterSubscription;
  removeSubscription(subscription: EmitterSubscription): void;
  addEventListenerForKey: (
    key: string,
    event: TerminalEvent,
    listener: (data: {outputText: string; key: string}) => void,
  ) => void;
  removeSubscriptionForKey: (key: string) => void;
};

const emitter = new NativeEventEmitter(TerminalModule);

export enum TerminalEvent {
  EVENT_COMMAND_OUTPUT = 'EVENT_COMMAND_OUTPUT',
  EVENT_COMMAND_FINISHED = 'EVENT_COMMAND_FINISHED',
}

function addEventListener(
  event: TerminalEvent,
  listener: (data: {outputText: string; key: string}) => void,
) {
  return emitter.addListener(event, listener);
}

function removeSubscription(subscription: EmitterSubscription) {
  return emitter.removeSubscription(subscription);
}

const listeners: Record<string, EmitterSubscription | undefined> = {};

const addEventListenerForKey = (
  key: string,
  event: TerminalEvent,
  listener: (data: {outputText: string; key: string}) => void,
) => {
  removeSubscriptionForKey(key);

  const subscription = addEventListener(event, listener);
  listeners[key] = subscription;
};

const removeSubscriptionForKey = (key: string) => {
  const previousListener = listeners[key];
  if (previousListener) {
    removeSubscription(previousListener);
    listeners[key] = undefined;
  }
};

export const Terminal: TerminalModuleType = {
  runCommand: TerminalModule.runCommand,
  stopCommand: TerminalModule.stopCommand,
  addEventListener,
  removeSubscription,
  addEventListenerForKey,
  removeSubscriptionForKey,
};
