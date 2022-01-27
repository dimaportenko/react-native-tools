import React, {FunctionComponent} from 'react';
import {requireNativeComponent, ViewProps} from 'react-native';

type Props = ViewProps & {
  type: NSButtonType;
  bezelStyle: NSBezelStyle;
  onPress?: () => void;
  title?: string;
};

export enum NSButtonType {
  NSButtonTypeMomentaryLight = 0,
  NSButtonTypePushOnPushOff = 1,
  NSButtonTypeToggle = 2,
  NSButtonTypeSwitch = 3,
  NSButtonTypeRadio = 4,
  NSButtonTypeMomentaryChange = 5,
  NSButtonTypeOnOff = 6,
  NSButtonTypeMomentaryPushIn = 7,
  NSButtonTypeAccelerator = 8,
  NSButtonTypeMultiLevelAccelerator = 9,
}

export enum NSBezelStyle {
  NSBezelStyleRounded = 1,
  NSBezelStyleRegularSquare = 2,
  NSBezelStyleDisclosure = 5,
  NSBezelStyleShadowlessSquare = 6,
  NSBezelStyleCircular = 7,
  NSBezelStyleTexturedSquare = 8,
  NSBezelStyleHelpButton = 9,
  NSBezelStyleSmallSquare = 10,
  NSBezelStyleTexturedRounded = 11,
  NSBezelStyleRoundRect = 12,
  NSBezelStyleRecessed = 13,
  NSBezelStyleRoundedDisclosure = 14,
  NSBezelStyleInline = 15,
}

type NativeProps = Props;

const RNNSButton = requireNativeComponent<NativeProps>('RNNSButton');

const NSButton: FunctionComponent<Props> = ({...otherProps}) => {
  return <RNNSButton {...otherProps} />;
};

export default NSButton;
