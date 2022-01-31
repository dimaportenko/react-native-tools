import {action, computed, makeObservable, observable} from 'mobx';

import {makePersistable} from 'mobx-persist-store';
import {persistStore} from './persist';
import {Project} from './Project';
import {RootStore} from './RootStore';
import {BashCommand} from './BashCommand';

export class ProjectStore {
  projects: Project[] = [];
  currentProjectId: number | undefined = undefined;
  rootStore: RootStore;

  kill8081: BashCommand = new BashCommand(
    'kill8081',
    'pid=$(lsof -i:8081 -t); kill -TERM $pid || kill -KILL $pid',
  );

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.projects = [];
    this.currentProjectId = undefined;

    makeObservable(this, {
      projects: observable,
      currentProjectId: observable,

      addProjectByPath: action,
      setCurrentProject: action,
      removeProject: action,
      setProjectLabel: action,

      current: computed,
    });

    makePersistable(this, {
      name: 'ProjectStore',
      properties: ['projects', 'currentProjectId'],
      storage: persistStore,
      stringify: false,
    });
  }

  get current() {
    return this.projects.find(p => p.id === this.currentProjectId);
  }

  addProjectByPath(path: string) {
    const project = new Project(path);

    const found = this.projects.find(proj => proj.path === project.path);
    if (!found) {
      // this.projects.push(project);
      this.projects = [...this.projects, project];
    }

    if (!this.current) {
      this.currentProjectId = found?.id ?? project.id;
    }
  }

  startBundler = (proj: Project) => {
    this.projects.forEach(p => {
      p.bundlerCommand.isRunning && p.bundlerCommand.stop();
    });

    proj.bundlerCommand.start();
  };

  setCurrentProject = (project: Project) => {
    this.currentProjectId = project.id;
  };

  setProjectLabel = (project: Project, label: string) => {
    const proj = this.projects.find(p => p.id === project.id);
    proj?.setLabel(label);
  };

  removeProject(project: Project) {
    this.projects = this.projects.filter(p => p.id !== project.id);

    if (this.current?.id === project.id) {
      this.currentProjectId = this.projects?.[0].id;
    }
  }
}
