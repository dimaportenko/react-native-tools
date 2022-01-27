//
//  RNNSButtonViewManager.m
//  ReactNativeTools-macOS
//
//  Created by Dmytro on 23.01.2022.
//

#import <React/RCTViewManager.h>

#import "RNNSButton.h"

@interface RNNSButtonViewManager : RCTViewManager
@end

@implementation RNNSButtonViewManager

RCT_EXPORT_MODULE(RNNSButton)

RCT_EXPORT_VIEW_PROPERTY(type, NSUInteger)

RCT_EXPORT_VIEW_PROPERTY(bezelStyle, NSUInteger)

RCT_EXPORT_VIEW_PROPERTY(title, NSString)

RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock);

- (NSView *)view
{
  RNNSButton *button = [RNNSButton new];
//  [button setButtonType:4];
  return button;
}

@end
