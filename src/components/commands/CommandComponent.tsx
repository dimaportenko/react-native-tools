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

interface CommandComponentProps {}

export const CommandComponent = observer((props: CommandComponentProps) => {
  const [expand, setExpand] = useState(false);
  const {project} = useStore();
  const {current} = project;

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
      <View style={tw`flex-row pt-2px pb-2px items-center`}>

        <Text style={tw.style({fontSize: 18})}>Bundler</Text>
        <Spacer size={8} />
        <HoverHighlighButton
          onPress={() => {
            project.startBundler(current);
          }}
          tintColor="#5C585F"
          imageSource={require('../../../assets/icons/ic_play_arrow_48px.png')}
        />
        <HoverHighlighButton
          disabled={!current.bundlerCommand.isRunning}
          onPress={current.bundlerCommand.stop}
          tintColor="#5C585F"
          imageSource={require('../../../assets/icons/ic_stop_48px.png')}
        />
        <View style={tw`flex-1`} />
        <View
          style={tw.style(
            `w-14px h-14px rounded-8px`,
            project.current?.bundlerCommand.isRunning
              ? 'bg-green-500'
              : 'bg-red-500',
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
      </View>
      {expand && (
        <ScrollView style={tw`w-100% h-300px bg-white dark:bg-black mt-3px`}>
          <Text selectable>{current.bundlerCommand.output}</Text>
        </ScrollView>
      )}
    </View>
  );
});
