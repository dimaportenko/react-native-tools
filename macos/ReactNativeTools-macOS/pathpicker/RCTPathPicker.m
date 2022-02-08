//
//  RCTPathPicker.m
//  ReactNativeTools-macOS
//
//  Created by Dmytro on 14.01.2022.
//

#import <React/RCTLog.h>

#import "RCTPathPicker.h"

@implementation RCTPathPicker

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getDirectoryPath:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  NSOpenPanel *panel = [NSOpenPanel openPanel];
  [panel setAllowsMultipleSelection:NO];
  [panel setCanChooseDirectories:YES];
  [panel setCanChooseFiles:NO];
  
  NSModalResponse response = [panel runModal];
  if (response == NSModalResponseCancel) {
    resolve(NULL);
    return;
  }
  
  NSString *path = [[[panel URLs] lastObject] path];
  RCTLogInfo(@"Selected path - %@", path);
  
  if (response == NSModalResponseOK) {
    resolve(path);
  } else {
    reject(@"event_failure", @"no directory selected", nil);
  }
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getApplicationSupportDirectoryPath)
{
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSApplicationSupportDirectory, NSUserDomainMask, YES);
  NSString *path = (NSString *) [paths firstObject];
  NSString *appBundle = [[NSBundle mainBundle] objectForInfoDictionaryKey:(NSString *)kCFBundleIdentifierKey];
  path = [path stringByAppendingPathComponent:appBundle];
  
  return path;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

@end
