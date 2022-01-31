import {BashCommand} from './BashCommand';
import {action, makeObservable, observable, runInAction} from 'mobx';
import {PersistBase} from './PersistBase';

export class Project extends PersistBase {
  id: number;
  label: string | undefined;
  path: string;
  bundlerCommand: BashCommand;

  constructor(path?: string, label?: string) {
    super('Project');

    this.id = new Date().getTime();
    this.path = path ?? '';
    this.label = label ?? this.path.split('/').pop();

    this.bundlerCommand = new BashCommand(
      `${this.label} react native start`,
      `source ~/.bash_profile && cd ${this.path} && npm start`,
    );

    makeObservable(this, {
      id: observable,
      path: observable,
      label: observable,
      bundlerCommand: observable,

      setLabel: action,
    });
  }

  setLabel = (text: string) => {
    this.label = text;
  };
}
