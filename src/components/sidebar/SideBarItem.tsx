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
import {useStore} from '../../store/RootStore';
import {observer} from 'mobx-react-lite';
import { Project } from "../../store/Project";

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
            style={tw.style({tintColor: '#178cff'}, 'w-20px h-20px')}
            resizeMode="contain"
          />
          <Spacer size={7} />
          {!!title && <Text>{title}</Text>}
        </View>
      </TouchableWithoutFeedback>
    );
  },
);
