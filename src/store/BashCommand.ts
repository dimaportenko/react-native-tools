import {EmitterSubscription} from 'react-native';
import {computed, makeObservable, observable, runInAction} from 'mobx';
import {Terminal, TerminalEvent} from '../native/terminal';
import {PersistBase} from './PersistBase';

export class BashCommand extends PersistBase {
  key: string;
  value: string;
  output: string;
  isRunning: boolean;

  constructor(key: string, value: string) {
    super('BashCommand');

    this.key = key;
    this.value = value;
    this.isRunning = false;
    this.output = '';

    makeObservable(this, {
      key: observable,
      value: observable,
      isRunning: observable,
      output: observable,

      outputSubscriptionKey: computed,
      finishSubscriptionKey: computed,
    });
  }

  get outputSubscriptionKey() {
    return `${this.key} output`;
  }

  get finishSubscriptionKey() {
    return `${this.key} finish`;
  }

  removeListeners = () => {
    Terminal.removeSubscriptionForKey(this.outputSubscriptionKey);
    Terminal.removeSubscriptionForKey(this.finishSubscriptionKey);
  };

  addListeners = () => {
    const self = this;

    Terminal.addEventListenerForKey(
      this.outputSubscriptionKey,
      TerminalEvent.EVENT_COMMAND_OUTPUT,
      ({outputText, key}) => {
        if (key === self.key) {
          runInAction(() => {
            self.output = self.output + outputText;
          });
        }
      },
    );

    Terminal.addEventListenerForKey(
      this.finishSubscriptionKey,
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
