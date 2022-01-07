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

const testProject = new Project(
  '/Users/dmytro/work/plab/react-native/ReactNativeTools',
);

export class ProjectStore {
  projects: Project[] = [testProject];
  current: Project | undefined;

  constructor() {
    this.current = testProject;

    makeAutoObservable(this);
  }
}
