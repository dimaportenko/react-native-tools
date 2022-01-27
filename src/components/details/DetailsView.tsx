/**
 * Created by Dima Portenko on 22.01.2022
 */
import React from 'react';
import {View} from 'react-native';
import {useStore} from '../../store';
import {Text} from '../ui/Text';
import tw from '../../lib/tailwind';
import {Spacer} from '../markup/Spacer';
import {observer} from 'mobx-react-lite';
import {BundlerCommand} from '../commands/BundlerCommand';
import NSButton, {
  NSBezelStyle,
  NSButtonType,
} from '../../native/nsbutton/NSButton';

interface DetailsViewProps {}

export const DetailsView = observer((props: DetailsViewProps) => {
  const {project} = useStore();

  if (!project.current) {
    return null;
  }

  return (
    <View style={tw`p-15px bg-gray-200 dark:bg-gray-700 flex-1`}>
      <Text style={tw.style({fontSize: 20}, 'font-semibold')}>
        {project.current.name}
      </Text>
      <Spacer size={5} />
      <Text
        style={tw.style({
          fontSize: 18,
        })}>{`Path: ${project.current.path}`}</Text>
      <Spacer size={5} />
      <NSButton
        title="Remove"
        onPress={() => {
          if (project.current) {
            project.removeProject(project.current);
          }
        }}
        style={tw`w-20 h-10`}
        type={NSButtonType.NSButtonTypeMomentaryLight}
        bezelStyle={NSBezelStyle.NSBezelStyleRounded}
      />
      <Spacer size={15} />
      <BundlerCommand />
    </View>
  );
});
