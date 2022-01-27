//
//  RNNSButton.m
//  ReactNativeTools-macOS
//
//  Created by Dmytro on 23.01.2022.
//

#import "RNNSButton.h"

@implementation RNNSButton

-(instancetype)init {
  if (self = [super init]) {
    [self setTarget:self];
    [self setAction:@selector(didPress)];
  }
  
  return self;
}

-(void)setType:(NSButtonType)buttonType {
  [self setButtonType:buttonType];
}

-(void)didPress {
  if (_onPress) {
    _onPress(@{});
  }
  
}

@end
