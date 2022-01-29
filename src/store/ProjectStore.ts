import {action, makeObservable, observable} from 'mobx';

import {makePersistable} from 'mobx-persist-store';
import {persistStore} from './persist';
import {Project} from './Project';

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

    makePersistable(this, {
      name: 'ProjectStore',
      properties: ['projects', 'current'],
      storage: persistStore,
      stringify: false,
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
