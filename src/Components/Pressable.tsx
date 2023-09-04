import React, { FC, useCallback, useMemo, useState } from 'react';
import { Animated, GestureResponderEvent, Insets, Pressable as NativePressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

import { normalize } from '@/Utils';

interface Props extends PressableProps {
  viewStyle?: StyleProp<ViewStyle>,
  disablePressDetectionOutsideArea?: boolean,
}

const Pressable: FC<Props> = ( { children, viewStyle, disablePressDetectionOutsideArea, onPressIn, onPressOut, ...props } ) => {
  const [ animated ] = useState( new Animated.Value( 1 ) );

  const isPressable = useMemo( () => !!props.onPress, [ props.onPress ] );
  const hitSlop: Insets | undefined = useMemo( () => disablePressDetectionOutsideArea ? undefined : ( {
    top: normalize( 5 ),
    bottom: normalize( 5 ),
    left: normalize( 10 ),
    right: normalize( 10 ),
  } ), [ disablePressDetectionOutsideArea ] );

  const fadeIn = useCallback( () => {
    Animated.timing( animated, {
      toValue: 0.6,
      duration: 100,
      useNativeDriver: true,
    } ).start();
  }, [ animated ] );

  const fadeOut = useCallback( () => {
    Animated.timing( animated, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    } ).start();
  }, [ animated ] );

  const onPressInHandler = useCallback( ( event: GestureResponderEvent ) => {
    if( isPressable ) {
      fadeIn();
    }
    onPressIn && onPressIn( event );
  }, [ fadeIn, onPressIn, isPressable ] );

  const onPressOutHandler = useCallback( ( event: GestureResponderEvent ) => {
    if( isPressable ) {
      fadeOut();
    }
    onPressOut && onPressOut( event );
  }, [ fadeOut, onPressOut, isPressable ] );

  return (
    <NativePressable
      onPressIn={onPressInHandler}
      onPressOut={onPressOutHandler}
      hitSlop={hitSlop}
      {...props}>
      <Animated.View style={[ { opacity: animated }, viewStyle ]}>
        {children}
      </Animated.View>
    </NativePressable>
  );
};

Pressable.defaultProps = {
  viewStyle: undefined,
  disablePressDetectionOutsideArea: undefined,
};

export default Pressable;
