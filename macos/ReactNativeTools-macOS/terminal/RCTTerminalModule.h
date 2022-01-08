//
//  RCTTerminalModule.h
//  ReactNativeTools-macOS
//
//  Created by Dmytro on 07.01.2022.
//

#import <React/RCTBridgeModule.h>
#import "SHCommand.h"

NS_ASSUME_NONNULL_BEGIN

@interface RCTTerminalModule : NSObject <RCTBridgeModule, SHCommandDelegate> {
  SHCommand*  m_command;
}

@end

NS_ASSUME_NONNULL_END
