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
import {ActivityIndicator, StyleSheet, View, useColorScheme} from 'react-native';

import {useDeviceContext} from 'twrnc';

import {rootStore, StoreProvider, trunk} from './store';
import {observer} from 'mobx-react-lite';
import tw from './lib/tailwind';
import {SideBar} from './components/sidebar/SideBar';
import {DetailsView} from './components/details/DetailsView';

const App = () => {
  const [isStoreLoaded, setIsStoreLoaded] = useState(false);
  useDeviceContext(tw);

  useEffect(() => {
    const rehydrate = async () => {
      await trunk.init();
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

const styles = StyleSheet.create({
  sectionContainer: {
    marginVertical: 16,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  status: {
    backgroundColor: 'gray',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default App;
