/**
 * Created by Dima Portenko on 22.01.2022
 */
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useStore} from '../../store/RootStore';
import {Text} from '../ui/Text';
import tw from '../../lib/tailwind';
import {HoverHighlighButton} from '../ui/HoverHighlighButton';
import {Spacer} from '../markup/Spacer';
import {BashCommand} from '../../store/BashCommand';

interface CustomCommandProps {
  cmd: BashCommand;
}

export const CustomCommand = observer(({cmd}: CustomCommandProps) => {
  const [expand, setExpand] = useState(false);
  const {project} = useStore();
  const {current} = project;

  return (
    <View
      style={tw`
      p-8px 
      border rounded-5px border-gray-400 dark:border-gray-600 
      bg-gray-300 dark:bg-gray-900 dark:bg-opacity-40
      `}>
      <View style={tw`flex-row pt-2px pb-2px items-center`}>
        <Text style={tw.style({fontSize: 18})}>{cmd.title}</Text>
        <Spacer size={8} />
        <HoverHighlighButton
          onPress={() => {
            cmd.start();
          }}
          tintColor="#5C585F"
          imageSource={require('../../../assets/icons/ic_play_arrow_48px.png')}
        />
        {cmd.isRunning && (
          <HoverHighlighButton
            disabled={!cmd.isRunning}
            onPress={cmd.stop}
            tintColor="#5C585F"
            imageSource={require('../../../assets/icons/ic_stop_48px.png')}
          />
        )}
        <View style={tw`flex-1`} />
        <View
          style={tw.style(
            `w-14px h-14px rounded-8px`,
            cmd.isRunning ? 'bg-green-500' : 'bg-red-500',
          )}
        />
        <Spacer size={8} />
        <HoverHighlighButton
          // disabled={!current.bundlerCommand.isRunning}
          onPress={() => setExpand(!expand)}
          // tintColor="#C75450"
          imageSource={
            expand
              ? require('../../../assets/icons/ic_expand_more_48px.png')
              : require('../../../assets/icons/ic-expand-less-48px.png')
          }
        />
        <HoverHighlighButton
          onPress={() => {
            current?.removeCmd(cmd);
          }}
          // style={tw`w-5 h-1`}
          imageSource={require('../../../assets/icons/ic_close_48px.png')}
        />
      </View>
      {expand && (
        <ScrollView style={tw`w-100% h-300px bg-white dark:bg-black mt-3px`}>
          <Text selectable>{cmd.output}</Text>
        </ScrollView>
      )}
    </View>
  );
});
