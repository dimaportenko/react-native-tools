import {createContext, useContext} from 'react';

import {ProjectStore} from './ProjectStore';

export class RootStore {
  project: ProjectStore;

  constructor() {
    this.project = new ProjectStore(this);
  }
}

export const rootStore = new RootStore();

export const StoreContext = createContext(rootStore);
export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);
