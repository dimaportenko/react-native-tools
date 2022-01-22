//
//  RNVisualEffectViewManager.m
//  QuickPaste-macOS
//
//  Created by Dmytro on 11.10.2021.
//

#import <Foundation/Foundation.h>

#import <React/RCTViewManager.h>

@interface RNVisualEffectViewManager : RCTViewManager
@end

@implementation RNVisualEffectViewManager

RCT_EXPORT_MODULE(RNVisualEffectView)

- (NSView *)view
{
  return [[NSVisualEffectView alloc] init];
}

@end
