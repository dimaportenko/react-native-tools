import React, {FunctionComponent} from 'react';
import {requireNativeComponent, ViewProps} from 'react-native';

type Props = ViewProps & {};

type NativeProps = Props;

const RNVisualEffectView =
  requireNativeComponent<NativeProps>('RNVisualEffectView');

const VisualEffectView: FunctionComponent<Props> = ({...otherProps}) => {
  return <RNVisualEffectView {...otherProps} />;
};

export default VisualEffectView;
