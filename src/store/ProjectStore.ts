import {makeAutoObservable} from 'mobx';

export class Project {
  id: number;
  name: string | undefined;
  path: string;

  constructor(path: string, name?: string) {
    this.id = new Date().getTime();
    this.path = path;
    this.name = name ?? path.split('/').pop();
  }
}

export class ProjectStore {
  projects: Project[] = [];
  current: Project | undefined = undefined;

  constructor() {
    this.projects = [];
    this.current = undefined;
    makeAutoObservable(this);
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
}
