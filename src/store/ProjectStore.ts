import {
  computed,
  makeAutoObservable,
  makeObservable,
  observable,
  action,
} from 'mobx';

export class BashCommand {
  key: string;
  value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;

    makeObservable(this, {
      key: observable,
      value: observable,
    });
  }
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
      // commandValue: computed,
      // commandKey: computed,
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
    if (this.current?.id === project.id) {
      this.current = undefined;
    }

    this.projects = this.projects.filter(p => p.id !== project.id);
  }
}
