/**
 * Created by Dima Portenko on 02.02.2022
 */
import React from 'react';
import {TextInput as RNTextInput, TextInputProps} from 'react-native';
import tw from '../../lib/tailwind';

interface Props extends TextInputProps {}

export const TextInput = ({style, ...props}: Props) => {
  return (
    <RNTextInput
      {...props}
      style={[
        tw`border rounded-5px border-gray-400 dark:border-gray-600`,
        style,
      ]}
    />
  );
};

