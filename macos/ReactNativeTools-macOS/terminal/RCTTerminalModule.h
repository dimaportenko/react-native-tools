//
//  RCTTerminalModule.h
//  ReactNativeTools-macOS
//
//  Created by Dmytro on 07.01.2022.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import "SHCommand.h"

NS_ASSUME_NONNULL_BEGIN

@interface RCTTerminalModule : RCTEventEmitter <RCTBridgeModule, SHCommandDelegate>

@end

NS_ASSUME_NONNULL_END
