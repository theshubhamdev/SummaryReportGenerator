import React, { FC, ReactNode, useMemo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { Pressable } from '@/Components';
import { normalize, useTheme } from '@/Hooks';
import { ThemeColors } from '@/Theme/theme.type';

interface Props {
  children: ReactNode,
  onPress?: () => void,
  style?: StyleProp<ViewStyle>,
  viewStyle?: StyleProp<ViewStyle>,
  shadow?: boolean,
}

const BaseCard: FC<Props> = ( { children, onPress, style, viewStyle, shadow } ) => {
  const { Colors } = useTheme();

  const styles = useMemo( () => stylesFn( Colors ), [ Colors ] );

  return (
    <Pressable
      style={[ styles.container, style, shadow ? styles.cardShadow : {} ]}
      viewStyle={viewStyle}
      onPress={onPress}
      android_disableSound={true}
    >
      {children}
    </Pressable>
  );
};

const stylesFn = ( Colors: ThemeColors ) => StyleSheet.create( {
  container: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    padding: normalize( 8 ),
  },
  cardShadow: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 10,
  },
} );

BaseCard.defaultProps = {
  onPress: undefined,
  style: undefined,
  viewStyle: undefined,
  shadow: false,
};

export default BaseCard;
