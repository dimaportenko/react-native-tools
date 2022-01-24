//
//  RNNSButton.h
//  ReactNativeTools-macOS
//
//  Created by Dmytro on 23.01.2022.
//

#import <AppKit/AppKit.h>
#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNNSButton : NSButton

@property (nonatomic, assign, setter=setType:) NSButtonType type;

@end

NS_ASSUME_NONNULL_END
