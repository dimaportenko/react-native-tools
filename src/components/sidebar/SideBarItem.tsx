/**
 * Created by Dima Portenko on 11.10.2021
 */
import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Spacer} from '../markup/Spacer';
import tw from '../../lib/tailwind';
import {Project} from '../../store/ProjectStore';
import {useStore} from '../../store';
import {observer} from 'mobx-react-lite';

type IconType = 'account' | 'file';

interface SideBarItemProps {
  title?: string;
  icon?: IconType;
  selected?: boolean;
  onPress?: () => void;
  item: Project;
}

const getIconSource = () => {
  return require('../../../assets/icons/ic_folder_open_48px.png');
};

export const SideBarItem = observer(
  ({title, item, onPress = () => {}}: SideBarItemProps) => {
    const {project} = useStore();
    const selected = project.current?.id === item.id;

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          style={[
            tw`flex-row h-28px items-center px-7px mx-10px mt-5px rounded-5px`,
            tw.style(selected && 'bg-selection-l dark:bg-selection-d'),
          ]}>
          <Image
            source={getIconSource()}
            style={{
              width: 16,
              height: 16,
              tintColor: '#178cff',
            }}
            resizeMode="contain"
          />
          <Spacer size={7} />
          {!!title && <Text>{title}</Text>}
        </View>
      </TouchableWithoutFeedback>
    );
  },
);
