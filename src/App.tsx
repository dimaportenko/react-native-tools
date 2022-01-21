/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {FC, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {useDeviceContext} from 'twrnc';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {rootStore, StoreProvider, trunk, useStore} from './store';
import {observer} from 'mobx-react-lite';
import {useCommand} from './native/terminal/useCommand';
import {ProjectStore} from './store/ProjectStore';
import {PathPicker} from './native/pathpicker';
import {Text} from './components/ui/Text';
import tw from './lib/tailwind';

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

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

const CommandComponent: FC<{
  project: ProjectStore;
  commandValue: string;
  commandKey: string;
}> = ({commandValue, commandKey, ...props}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const {start, stop, output, isRunning} = useCommand({
    commandValue,
    commandKey,
  });

  return (
    <View
      style={{
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
        flex: 1,
      }}>
      <Section title={props.project.current?.name ?? ''}>
        {`Project root path: ${props.project.current?.path}`}
      </Section>

      <Button title={'Start'} onPress={start} />

      <Button title={'Stop'} onPress={stop} />

      <View style={{alignItems: 'center', marginTop: 10}}>
        <View
          style={[
            styles.status,
            {backgroundColor: isRunning ? 'green' : 'red'},
          ]}
        />
      </View>

      <Section title={commandValue}>{`Output: \n ${output}`}</Section>
    </View>
  );
};

const AppContainer = observer(() => {
  const {project} = useStore();
  console.warn(project.projects.length);

  const getDir = async () => {
    try {
      const path = await PathPicker.getDirectoryPath();
      console.log(path);
      project.addProjectByPath(path);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error?.message);
    }
  };

  if (!project.current) {
    return (
      <View
        style={tw`flex-1 items-center justify-center bg-white dark:bg-black`}>
        <Text style={tw`font-18`}>No projects are added yet</Text>
        <Button title="Add Project" onPress={getDir} />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-white dark:bg-black`}>
      <View style={tw`max-w-200px bg-blue-100`}>
        <View style={tw``}>
          {project.projects.map(proj => {
            console.warn(proj.name);
            return (
              <View key={`${proj.path}`} style={tw`pt-5px pl-5px`}>
                <Text>{proj.name}</Text>
              </View>
            );
          })}
        </View>
        {/*<Text>{project.current.name}</Text>*/}
        <View style={tw`flex-1`} />
        <Button title="Add Project" onPress={getDir} />
      </View>
    </View>
  );
});

const AppContainerOld = observer(() => {
  const {project} = useStore();
  const isDarkMode = useColorScheme() === 'dark';
  // const [command, setCommand] = useState('cd ~/work && ls -la');

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
    flex: 1,
  };

  const getDir = async () => {
    try {
      const path = await PathPicker.getDirectoryPath();
      console.log(path);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Button title="Add Project" onPress={getDir} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <CommandComponent
          commandKey="command 1"
          project={project}
          commandValue={'ping google.com'}
        />
        <CommandComponent
          commandKey="command 2"
          project={project}
          commandValue={'ping yahoo.com'}
        />
      </ScrollView>
    </SafeAreaView>
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
