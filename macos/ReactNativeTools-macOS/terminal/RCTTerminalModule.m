//
//  RCTTerminalModule.m
//  ReactNativeTools-macOS
//
//  Created by Dmytro on 07.01.2022.
//

#import "RCTTerminalModule.h"

#import <React/RCTLog.h>

@implementation RCTTerminalModule

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
  
  if (m_command)
  {
      if ([m_command isExecuting])
      {
          [m_command stopExecuting];
      }
  }
  
//  NSLog(@"textCommand - %@, withArguments - %@", [[self textCommand] stringValue], arrayArguments);
  m_command = [SHCommand commandWithExecutablePath:@"/bin/sh" withArguments:arrayArguments withDelegate:self];
  [m_command execute];
  
//  [[self progressExecuting] startAnimation:self];
//  [[self progressExecuting] setHidden:NO];
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
}

- (void) errorData:(NSData *)data providedByCommand:(SHCommand *)command
{
  RCTLogInfo(@"ERROR: %@", [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding]);
}

@end
