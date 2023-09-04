import React, { FC, useCallback, useMemo, useState } from 'react';
import { Animated, GestureResponderEvent, StyleSheet, Text, TextProps } from 'react-native';
import Hyperlink from 'react-native-hyperlink';

import type { ThemeColors } from '@/Theme/theme.type';

import { useTheme } from '@/Hooks';

const BaseText: FC<TextProps> = ( { children, style, onPressIn, onPressOut, onPress, ...props } ) => {
  const { Fonts, Colors } = useTheme();

  const styles = useMemo( () => stylesFn( Colors ), [ Colors ] );

  const [ animated ] = useState( new Animated.Value( 1 ) );

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
    fadeIn();
    onPressIn && onPressIn( event );
  }, [ fadeIn, onPressIn ] );

  const onPressOutHandler = useCallback( ( event: GestureResponderEvent ) => {
    fadeOut();
    onPressOut && onPressOut( event );
  }, [ fadeOut, onPressOut ] );

  if( onPress ) {
    return (
      <Hyperlink
        linkDefault={ true }
        linkStyle={[ Fonts.fMontserrat, Fonts.wtNormal, styles.hyperlinkTextStyle ]}
      >
        <Animated.Text
          onPressIn={onPressInHandler}
          onPressOut={onPressOutHandler}
          onPress={onPress}
          allowFontScaling={false}
          { ...props }
          style={ [ Fonts.fMontserrat, Fonts.wtNormal, styles.textStyle, { opacity: animated }, style ] } >
          { children }
        </Animated.Text>
      </Hyperlink>
    );
  }
  return (
    <Hyperlink
      linkDefault={ true }
      linkStyle={[ Fonts.fMontserrat, Fonts.wtNormal, styles.hyperlinkTextStyle ]}
    >
      <Text
        allowFontScaling={false}
        { ...props }
        style={ [ Fonts.fMontserrat, Fonts.wtNormal, styles.textStyle, style ] } >
        { children }
      </Text>
    </Hyperlink>
  );
};

const stylesFn = ( Colors: ThemeColors ) => StyleSheet.create( {
  textStyle: {
    fontStyle: 'normal',
    color: Colors.black,
  },
  hyperlinkTextStyle: {
    fontStyle: 'normal',
    color: Colors.primary,
  },
} );

export default BaseText;
