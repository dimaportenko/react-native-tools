/**
 * Created by Dima Portenko on 22.01.2022
 */
import React from 'react';
import {ScrollView, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useStore} from '../../store/RootStore';
import {Text} from '../ui/Text';
import tw from '../../lib/tailwind';
import {HoverHighlighButton} from '../ui/HoverHighlighButton';
import {Spacer} from '../markup/Spacer';

interface CommandComponentProps {}

export const CommandComponent = observer((props: CommandComponentProps) => {
  const {
    project: {current},
  } = useStore();

  if (!current) {
    return null;
  }

  return (
    <View
      style={tw`
      p-8px 
      border rounded-5px border-gray-400 dark:border-gray-600 
      bg-gray-300 dark:bg-gray-900 dark:bg-opacity-40
      `}>
      <View style={tw`flex-row pt-2px pb-5px items-center`}>
        <Text style={tw.style({fontSize: 18})}>Bundler</Text>
        <Spacer size={8} />
        <HoverHighlighButton
          onPress={current.bundlerCommand.start}
          tintColor="#499C54"
          imageSource={require('../../../assets/icons/ic_play_arrow_48px.png')}
        />
        <HoverHighlighButton
          disabled={!current.bundlerCommand.isRunning}
          onPress={current.bundlerCommand.stop}
          tintColor="#C75450"
          imageSource={require('../../../assets/icons/ic_stop_48px.png')}
        />
      </View>
      <ScrollView style={tw`w-100% h-300px bg-white dark:bg-black`}>
        <Text>{current.bundlerCommand.output}</Text>
      </ScrollView>
    </View>
  );
});
