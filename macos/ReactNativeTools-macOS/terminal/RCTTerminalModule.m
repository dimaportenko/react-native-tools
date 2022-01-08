//
//  RCTTerminalModule.m
//  ReactNativeTools-macOS
//
//  Created by Dmytro on 07.01.2022.
//

#import "RCTTerminalModule.h"

#import <React/RCTLog.h>

@implementation RCTTerminalModule {
  bool hasListeners;
  SHCommand*  mCommand;
}

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(runCommand:(NSString *)commandString)
{
  RCTLogInfo(@"runCommand: %@", commandString);
  
  NSArray* arrayArguments = @[@"-c", commandString];
  
  //  if ([[[self textArguments] stringValue] length] > 0)
  //  {
  //      arrayArguments = [[[self textArguments] stringValue] componentsSeparatedByString:@","];
  //  }
  
  if (mCommand)
  {
    if ([mCommand isExecuting])
    {
      [mCommand stopExecuting];
    }
  }
  
  //  NSLog(@"textCommand - %@, withArguments - %@", [[self textCommand] stringValue], arrayArguments);
  mCommand = [SHCommand commandWithExecutablePath:@"/bin/sh" withArguments:arrayArguments withDelegate:self];
  [mCommand execute];
  
  //  [[self progressExecuting] startAnimation:self];
  //  [[self progressExecuting] setHidden:NO];
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
  return @[@"CommandOutput"];
}

#pragma mark - SHCommandDelegate


- (void) commandDidFinish:(SHCommand *)command withExitCode:(int)iExitCode
{
  //    [[self progressExecuting] stopAnimation:self];
  //    [[self progressExecuting] setHidden:YES];
  //
  //    [[self textOutput] setStringValue:[NSString stringWithFormat:@"FINISHED: Exit Code %d", iExitCode]];
  RCTLogInfo(@"FINISHED: Exit Code %d", iExitCode);
}

- (void) outputData:(NSData *)data providedByCommand:(SHCommand *)command
{
  NSString* szOutput = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
  
  RCTLogInfo(@"outputData: %@", szOutput);
  
  //    [[self textOutput] setStringValue:szOutput];
  if (hasListeners) { // Only send events if anyone is listening
    [self sendEventWithName:@"CommandOutput" body:@{@"outputText": szOutput}];
  }
}

- (void) errorData:(NSData *)data providedByCommand:(SHCommand *)command
{
  RCTLogInfo(@"ERROR: %@", [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding]);
}

@end
