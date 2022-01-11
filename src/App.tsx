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
import {Terminal, TerminalEvent} from './native/terminal';
import {usePrevious} from './utils/usePrevious';

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

const AppContainer = observer(() => {
  const {project} = useStore();
  const isDarkMode = useColorScheme() === 'dark';
  const [output, setOutput] = useState('');
  const [isRunning, setIsRuning] = useState(false);
  const [lastOutput, setLastOutput] = useState('');
  // const [command, setCommand] = useState('cd ~/work && ls -la');
  const [command, setCommand] = useState('ping google.com');

  const prevLastOutput = usePrevious(lastOutput);

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
    flex: 1,
  };

  useEffect(() => {
    const outputListener = Terminal.addEventListener(
      TerminalEvent.EVENT_COMMAND_OUTPUT,
      ({outputText}) => {
        setLastOutput(outputText);
      },
    );
    const finishListener = Terminal.addEventListener(
      TerminalEvent.EVENT_COMMAND_FINISHED,
      () => {
        setIsRuning(false);
      },
    );
    return () => {
      Terminal.removeSubscription(outputListener);
      Terminal.removeSubscription(finishListener);
    };
  }, []);

  useEffect(() => {
    if (lastOutput !== prevLastOutput) {
      setOutput(output + lastOutput);
    }
  }, [lastOutput, output, prevLastOutput]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            flex: 1,
          }}>
          <Section title={project.current?.name ?? ''}>
            {`Project root path: ${project.current?.path}`}
          </Section>

          <Button
            title={'Start'}
            onPress={() => {
              setOutput('');
              setIsRuning(true);
              Terminal.runCommand(command);
            }}
          />

          <Button
            title={'Stop'}
            onPress={() => {
              Terminal.stopCommand();
            }}
          />

          <View style={{alignItems: 'center', marginTop: 10}}>
            <View
              style={[
                styles.status,
                {backgroundColor: isRunning ? 'green' : 'red'},
              ]}
            />
          </View>

          <Section title={command}>{`Output: \n ${output}`}</Section>
        </View>
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
