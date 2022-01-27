import {
  computed,
  makeAutoObservable,
  makeObservable,
  observable,
  action,
  runInAction,
} from 'mobx';
import {EmitterSubscription} from 'react-native';
import {Terminal, TerminalEvent} from '../native/terminal';

export class BashCommand {
  key: string;
  value: string;
  output: string;
  isRunning: boolean;
  outputListener: EmitterSubscription | undefined;
  finishListener: EmitterSubscription | undefined;

  constructor(key: string, value: string) {
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
    debugger
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

export class Project {
  id: number;
  name: string | undefined;
  path: string;
  bundlerCommand: BashCommand;

  constructor(path: string, name?: string) {
    this.id = new Date().getTime();
    this.path = path;
    this.name = name ?? path.split('/').pop();

    this.bundlerCommand = new BashCommand(
      `${this.name} react native start`,
      `source ~/.bash_profile && cd ${this.path} && npm start`,
    );

    makeObservable(this, {
      id: observable,
      path: observable,
      name: observable,
      bundlerCommand: observable,
    });
  }
}

export class ProjectStore {
  projects: Project[] = [];
  current: Project | undefined = undefined;

  constructor() {
    this.projects = [];
    this.current = undefined;
    makeObservable(this, {
      projects: observable,
      current: observable,
      addProjectByPath: action,
      setCurrentProject: action,
      removeProject: action,
    });
  }

  addProjectByPath(path: string) {
    const project = new Project(path);

    const found = this.projects.find(proj => proj.path === project.path);
    if (!found) {
      // this.projects.push(project);
      this.projects = [...this.projects, project];
    }

    if (!this.current) {
      this.current = found || project;
    }
  }

  setCurrentProject(project: Project) {
    this.current = project;
  }

  removeProject(project: Project) {
    this.projects = this.projects.filter(p => p.id !== project.id);

    if (this.current?.id === project.id) {
      this.current = this.projects?.[0];
    }
  }
}
