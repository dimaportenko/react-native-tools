/**
 * Created by Dima Portenko on 02.02.2022
 */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import tw from '../../lib/tailwind';
import {TextInput} from '../ui/TextInput';
import {Spacer} from '../markup/Spacer';
import {HoverHighlighButton} from '../ui/HoverHighlighButton';

interface NewCommandProps {
  onClose: () => void;
  onSave: (title: string, cmd: string) => void;
}

export const NewCommand = ({onClose, onSave}: NewCommandProps) => {
  const [title, setTitle] = useState('');
  const [cmd, setCmd] = useState('');

  const [valid, setValid] = useState(false);

  useEffect(() => {
    setValid(title.length > 0 && cmd.length > 0);
  }, [title, cmd]);

  return (
    <View
      style={tw`
      p-8px 
      border rounded-5px border-gray-400 dark:border-gray-600 
      bg-gray-300 dark:bg-gray-900 dark:bg-opacity-40
      flex-row
      `}>
      <View style={tw`min-w-300px`}>
        <TextInput
          placeholder="Title"
          style={tw`h-30px max-w-300px bg-gray-200 dark:bg-gray-800 p-2px`}
          value={title}
          onChange={({nativeEvent: {text}}) => setTitle(text)}
        />
        <Spacer size={5} />
        <TextInput
          // enableFocusRing
          placeholder="Command"
          // multiline
          style={tw`h-30px max-w-300px bg-gray-200 dark:bg-gray-800 h-80px`}
          value={cmd}
          onChange={({nativeEvent: {text}}) => setCmd(text)}
        />
      </View>
      <View style={tw`flex-1`} />
      <View>
        <HoverHighlighButton
          onPress={onClose}
          imageSource={require('../../../assets/icons/ic_close_48px.png')}
        />
        <View style={tw`flex-1`} />
        <HoverHighlighButton
          disabled={!valid}
          onPress={() => {
            onSave(title, cmd);
          }}
          style={tw.style(!valid && 'opacity-30')}
          imageSource={require('../../../assets/icons/ic_check_48px.png')}
        />
      </View>
    </View>
  );
};
