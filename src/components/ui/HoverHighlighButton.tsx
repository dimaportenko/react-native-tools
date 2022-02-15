/**
 * Created by Dima Portenko on 23.01.2022
 */
import React, {useState} from 'react';
import {
  Image,
  ImageSourcePropType, ImageStyle,
  Pressable,
  PressableProps,
  View
} from "react-native";
import tw from '../../lib/tailwind';

interface HoverHighlighButtonProps extends PressableProps {
  tintColor?: string;
  disabledTintColor?: string;
  imageSource?: ImageSourcePropType;
  onPress?: () => void;
  imgStyle?: ImageStyle;
}

export const HoverHighlighButton = ({
  style,
  imgStyle,
  imageSource,
  tintColor = '#4C5052',
  disabledTintColor = '#4C5052',
  disabled,
  ...props
}: HoverHighlighButtonProps) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      {...props}
      disabled={disabled}
      // @ts-ignore
      onHoverIn={() => {
        setHovered(true);
      }}
      onHoverOut={() => {
        setHovered(false);
      }}
      onPressIn={() => {
        setPressed(true);
      }}
      onPressOut={() => {
        setPressed(false);
      }}
      style={tw`w-36px`}>
      <View
        style={[
          // @ts-ignore
          style,
          tw.style(
            hovered && !disabled && 'bg-selection-l dark:bg-selection-d',
            pressed && !disabled && 'bg-pressed-l dark:bg-pressed-d',
            'rounded-5px p-2px',
          ),
        ]}>
        {imageSource && (
          <Image
            source={imageSource}
            style={tw.style(
              {tintColor: disabled ? disabledTintColor : tintColor},
              'w-30px h-30px',
              imgStyle,
            )}
            resizeMode="contain"
          />
        )}
      </View>
    </Pressable>
  );
};
