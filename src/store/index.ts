import {ProjectStore} from './ProjectStore';
import {createContext, useContext} from 'react';

export class RootStore {
  project: ProjectStore;

  constructor() {
    this.project = new ProjectStore();
  }
}

export const rootStore = new RootStore();

export const StoreContext = createContext(rootStore);
export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);
