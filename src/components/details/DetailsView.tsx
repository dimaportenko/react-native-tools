/**
 * Created by Dima Portenko on 22.01.2022
 */
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {useStore} from '../../store/RootStore';
import {Text} from '../ui/Text';
import tw from '../../lib/tailwind';
import {Spacer} from '../markup/Spacer';
import {observer} from 'mobx-react-lite';
import {CommandComponent} from '../commands/CommandComponent';
import NSButton, {
  NSBezelStyle,
  NSButtonType,
} from '../../native/nsbutton/NSButton';
import {NewCommand} from '../commands/NewCommand';
import {CustomCommand} from '../commands/CustomCommand';
import {HoverHighlighButton} from '../ui/HoverHighlighButton';

interface DetailsViewProps {}

export const DetailsView = observer((props: DetailsViewProps) => {
  const [renaming, setRenaming] = useState(false);
  const [creatingCmd, setCreatingCmd] = useState(false);
  const titleInputRef = useRef<TextInput>(null);
  const {project} = useStore();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (renaming) {
      titleInputRef.current?.focus();
    }
  }, [renaming, titleInputRef]);

  useEffect(() => {
    setCreatingCmd(false);
  }, [project.current]);

  if (!project.current) {
    return null;
  }

  const addCmd = (title: string, cmd: string) => {
    project.current?.addCommand(title, cmd);
    setCreatingCmd(false);
  };

  return (
    <View
      style={tw.style(
        'p-15px flex-1',
        colorScheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200',
      )}>
      <ScrollView>
        {/*<Text style={tw.style({fontSize: 20}, 'font-semibold')}>*/}
        {/*  {project.current.label}*/}
        {/*</Text>*/}
        <View style={tw`w-50% flex-row items-center`}>
          {renaming ? (
            <TextInput
              maxLength={400}
              ref={titleInputRef}
              style={tw.style({fontSize: 20}, 'font-semibold h-25px w-100%')}
              value={project.current.label}
              onChange={event => {
                project.current?.setLabel(event.nativeEvent.text);
              }}
              editable={renaming}
              onSubmitEditing={() => setRenaming(false)}
              selectTextOnFocus
              onBlur={() => setRenaming(false)}
            />
          ) : (
            <>
              <Text style={tw.style({fontSize: 20}, 'font-semibold h-25px')}>
                {project.current.label}
              </Text>
              <Spacer size={15} />
              <HoverHighlighButton
                onPress={() => {
                  setRenaming(true);
                }}
                style={tw`w-25px h-30px items-center justify-center`}
                imgStyle={tw`w-20px h-20px`}
                imageSource={require('../../../assets/icons/ic_edit_48px.png')}
              />
              <HoverHighlighButton
                onPress={() => {
                  if (project.current) {
                    project.removeProject(project.current);
                  }
                }}
                style={tw`w-25px h-30px items-center justify-center`}
                imgStyle={tw`w-20px h-20px`}
                imageSource={require('../../../assets/icons/ic_delete_forever_48px.png')}
              />
            </>
          )}
        </View>

        <Spacer size={5} />
        <Text
          style={tw.style('ml-3px', {
            fontSize: 18,
          })}>{`Path: ${project.current.path}`}</Text>
        <Spacer size={5} />

        <View style={tw`flex-row`}>
          <NSButton
            title="Kill 8081"
            onPress={() => {
              project.kill8081.start();
            }}
            style={tw`w-20 h-10`}
            type={NSButtonType.NSButtonTypeMomentaryLight}
            bezelStyle={NSBezelStyle.NSBezelStyleRounded}
          />
          {project.kill8081.isRunning && <ActivityIndicator size="small" />}
          <NSButton
            title="New Command"
            onPress={() => {
              setCreatingCmd(true);
            }}
            style={tw`w-30 h-10`}
            type={NSButtonType.NSButtonTypeMomentaryLight}
            bezelStyle={NSBezelStyle.NSBezelStyleRounded}
          />
        </View>
        <Spacer size={15} />
        {creatingCmd && (
          <>
            <NewCommand onSave={addCmd} onClose={() => setCreatingCmd(false)} />
            <Spacer size={15} />
          </>
        )}
        <CommandComponent />
        <Spacer size={15} />
        {project.current.commands.map(cmd => (
          <View key={cmd.key}>
            <CustomCommand cmd={cmd} />
            <Spacer size={15} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
});
