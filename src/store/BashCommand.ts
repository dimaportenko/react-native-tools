import {EmitterSubscription} from 'react-native';
import {makeObservable, observable, runInAction} from 'mobx';
import {Terminal, TerminalEvent} from '../native/terminal';
import { PersistBase } from "./PersistBase";

export class BashCommand extends PersistBase {
  key: string;
  value: string;
  output: string;
  isRunning: boolean;
  outputListener: EmitterSubscription | undefined;
  finishListener: EmitterSubscription | undefined;

  constructor(key: string, value: string) {
    super('BashCommand');

    this.key = key;
    this.value = value;
    this.isRunning = false;
    this.output = '';

    this.outputListener = undefined;
    this.finishListener = undefined;

    makeObservable(this, {
      key: observable,
      value: observable,
      isRunning: observable,
      output: observable,
    });
  }

  removeListeners = () => {
    if (this.outputListener) {
      // debugger
      Terminal.removeSubscription(this.outputListener);
      this.outputListener = undefined;
    }
    if (this.finishListener) {
      Terminal.removeSubscription(this.finishListener);
      this.finishListener = undefined;
    }
  };

  addListeners = () => {
    const self = this;
    this.removeListeners();

    this.outputListener = Terminal.addEventListener(
      TerminalEvent.EVENT_COMMAND_OUTPUT,
      ({outputText, key}) => {
        if (key === self.key) {
          runInAction(() => {
            self.output = self.output + outputText;
          });
        }
      },
    );

    this.finishListener = Terminal.addEventListener(
      TerminalEvent.EVENT_COMMAND_FINISHED,
      ({key}) => {
        if (key === self.key) {
          // console.warn('stopped ', key);
          runInAction(() => {
            self.isRunning = false;
          });
          self.removeListeners();
        }
      },
    );
  };

  start = () => {
    this.addListeners();

    runInAction(() => {
      this.output = '';
      this.isRunning = true;
    });

    Terminal.runCommand(this.value, this.key);
  };

  stop = () => {
    Terminal.stopCommand(this.key);
  };
}
