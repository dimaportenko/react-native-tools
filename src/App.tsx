/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';

import {useDeviceContext} from 'twrnc';

import {rootStore, StoreProvider} from './store/RootStore';
import {observer} from 'mobx-react-lite';
import tw from './lib/tailwind';
import {SideBar} from './components/sidebar/SideBar';
import {DetailsView} from './components/details/DetailsView';

const App = () => {
  const [isStoreLoaded, setIsStoreLoaded] = useState(false);
  useDeviceContext(tw);

  useEffect(() => {
    const rehydrate = async () => {
      // await trunk.init();
      setIsStoreLoaded(true);
    };
    rehydrate();
  }, []);

  if (!isStoreLoaded) {
    return (
      <View style={tw`flex-1 justify-center`}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <StoreProvider value={rootStore}>
        <AppContainer />
      </StoreProvider>
    );
  }
};

const AppContainer = observer(() => {
  return (
    <View style={tw`flex-row h-100%`}>
      <View style={tw`max-w-250px min-w-140px flex-col-reverse`}>
        <SideBar />
      </View>
      <DetailsView />
    </View>
  );
});

export default App;
