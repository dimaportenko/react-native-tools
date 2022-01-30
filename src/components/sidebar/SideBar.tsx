/**
 * Created by Dima Portenko on 11.10.2021
 */
import React from 'react';
import {
  Button,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  View,
} from 'react-native';
import {SideBarItem} from './SideBarItem';
import {Text} from '../ui/Text';
import {useStore} from '../../store/RootStore';
import tw from '../../lib/tailwind';
import {usePathPicker} from '../../native/pathpicker';
import {observer} from 'mobx-react-lite';
import { Project } from "../../store/Project";

interface SideBarProps {}

export const SideBar = observer((props: SideBarProps) => {
  const {project} = useStore();

  const {getDirectoryPath} = usePathPicker();

  const addProject = async () => {
    const path = await getDirectoryPath();
    if (path) {
      project.addProjectByPath(path);
    }
  };

  const selectProject = (item: Project) => project.setCurrentProject(item);

  const renderItem = ({item, index}: ListRenderItemInfo<Project>) => {
    return (
      <SideBarItem
        title={item.label}
        item={item}
        onPress={() => selectProject(item)}
      />
    );
  };

  return (
    <View style={tw`flex-1 bg-gray-300 dark:bg-gray-600 pt-10px`}>
      <FlatList
        data={project.projects}
        renderItem={renderItem}
        keyExtractor={item => `${item.path}`}
      />
      <TouchableOpacity onPress={addProject}>
        <View
          style={tw`w-100% items-center h-30px justify-center bg-blue-100 dark:bg-blue-600`}>
          <Text>Add Project</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
});
