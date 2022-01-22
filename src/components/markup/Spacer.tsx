/**
 * Created by Dima Portenko on 08.12.2020
 */
import React from 'react';
import {View} from 'react-native';

interface SpacerProps {
  size?: number;
}

export const Spacer = ({size}: SpacerProps) => {
  return <View style={{height: size, width: size}} />;
};
