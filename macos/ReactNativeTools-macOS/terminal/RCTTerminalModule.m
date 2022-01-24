//
//  RCTTerminalModule.m
//  ReactNativeTools-macOS
//
//  Created by Dmytro on 07.01.2022.
//

#import "RCTTerminalModule.h"

#import <React/RCTLog.h>

static NSString *const EVENT_COMMAND_OUTPUT = @"EVENT_COMMAND_OUTPUT";
static NSString *const EVENT_COMMAND_FINISHED = @"EVENT_COMMAND_FINISHED";

@implementation RCTTerminalModule {
  bool hasListeners;
  NSMutableDictionary *_commandsDict;
}

- (NSMutableDictionary *)commandsDict {
    if (!_commandsDict) {
      _commandsDict = [NSMutableDictionary new];
    }
    return _commandsDict;
}

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(stopCommand:(NSString *) key)
{
  RCTLogInfo(@"stopCommand");
  SHCommand *command = [self commandForKey:key];
  if (command)
  {
    if ([command isExecuting])
    {
      [command stopExecuting];
    }
  }
}

RCT_EXPORT_METHOD(runCommand:(NSString *)commandString withKey:(NSString *)key) {

  NSArray* arrayArguments = @[@"-c", commandString];
  
  SHCommand *command = [SHCommand commandWithExecutablePath:@"/bin/bash" withArguments:arrayArguments withDelegate:self];
  
  [[self commandsDict] setObject:command forKey:key];
  [command execute];
}

- (SHCommand *)commandForKey:(NSString *)key {
    return [[self commandsDict] objectForKey:key];
}

- (NSString *)keyForCommand:(SHCommand *)command {
    return [[[self commandsDict] allKeysForObject:command] firstObject];
}

#pragma mark - RCTEventEmitter

// Will be called when this module's first listener is added.
-(void) startObserving {
  hasListeners = YES;
  // Set up any upstream listeners or background tasks as necessary
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void) stopObserving {
  hasListeners = NO;
  // Remove upstream listeners, stop unnecessary background tasks
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[EVENT_COMMAND_OUTPUT, EVENT_COMMAND_FINISHED];
}

#pragma mark - SHCommandDelegate


- (void) commandDidFinish:(SHCommand *)command withExitCode:(int)iExitCode
{
  [self sendEventWithName:EVENT_COMMAND_FINISHED body:@{@"code": [NSNumber numberWithInt:iExitCode], @"key": [self keyForCommand:command]}];
  RCTLogInfo(@"FINISHED: Exit Code %d", iExitCode);
}

- (void) outputData:(NSData *)data providedByCommand:(SHCommand *)command
{
  NSString* szOutput = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
  
  RCTLogInfo(@"outputData: %@", szOutput);
  
  if (hasListeners) { // Only send events if anyone is listening
    [self sendEventWithName:EVENT_COMMAND_OUTPUT body:@{@"outputText": szOutput, @"key": [self keyForCommand:command]}];
  }
}

- (void) errorData:(NSData *)data providedByCommand:(SHCommand *)command
{
  NSString* szOutput = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
  RCTLogInfo(@"ERROR: %@", szOutput);
  
  if (hasListeners) { // Only send events if anyone is listening
    [self sendEventWithName:EVENT_COMMAND_OUTPUT body:@{@"outputText": szOutput, @"key": [self keyForCommand:command]}];
  }

}

@end
