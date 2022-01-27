/**
 * Created by Dima Portenko on 22.01.2022
 */
import React from 'react';
import {ScrollView, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useStore} from '../../store';
import {Text} from '../ui/Text';
import tw from '../../lib/tailwind';
import {HoverHighlighButton} from '../ui/HoverHighlighButton';
import {useCommand} from '../../native/terminal/useCommand';
import {Spacer} from '../markup/Spacer';

interface BundlerCommandProps {}

export const BundlerCommand = observer((props: BundlerCommandProps) => {
  const {project} = useStore();
  // const commandValue = `source ~/.bash_profile && cd ${project.current?.path} && npm start`;
  // const commandValue = `ping google.com`;
  // const commandKey = `${project.current?.name} react native start`;
  console.log('tst', project.current?.name, project.commandValue, project.commandKey)
  const {start, stop, output, isRunning} = useCommand({
    commandValue: project.commandValue,
    commandKey: project.commandKey,
  });

  return (
    <View
      style={tw`border rounded-5px border-opacity-30 border-white dark:border-white p-8px`}>
      <View style={tw`flex-row pt-2px pb-5px items-center`}>
        <Text style={tw.style({fontSize: 18})}>Bundler Command</Text>
        <Spacer size={8} />
        <HoverHighlighButton
          onPress={start}
          tintColor="#499C54"
          imageSource={require('../../../assets/icons/ic_play_arrow_48px.png')}
        />
        <HoverHighlighButton
          disabled={!isRunning}
          onPress={stop}
          tintColor="#C75450"
          imageSource={require('../../../assets/icons/ic_stop_48px.png')}
        />
      </View>
      <ScrollView style={tw`w-100% h-300px bg-white dark:bg-black`}>
        <Text>{output}</Text>
      </ScrollView>
    </View>
  );
});
