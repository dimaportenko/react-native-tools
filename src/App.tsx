/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {FC, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {rootStore, StoreProvider, useStore} from './store';
import {observer} from 'mobx-react-lite';
import {useCommand} from './native/terminal/useCommand';
import {ProjectStore} from './store/ProjectStore';
import {PathPicker} from './native/pathpicker';

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
  return (
    <StoreProvider value={rootStore}>
      <AppContainer />
    </StoreProvider>
  );
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
      <Button
        title="Add Project"
        onPress={getDir}
      />
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
