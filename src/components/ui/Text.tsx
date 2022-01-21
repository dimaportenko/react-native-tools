/**
 * Created by Dima Portenko on 21.01.2022
 */
import React from 'react';
import {TextProps as RNTextProps, Text as RNText} from 'react-native';
import tw from '../../lib/tailwind';

type TextProps = RNTextProps | Readonly<RNTextProps>;

export const Text = ({style, ...props}: TextProps) => {
  return <RNText {...props} style={[tw`text-black dark:text-white`, style]} />;
};
