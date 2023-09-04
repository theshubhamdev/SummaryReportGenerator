import React, { FC, useMemo } from 'react';
import { Image, ImageSourcePropType, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';
import { SvgProps } from 'react-native-svg';

import { BaseText, Pressable } from '@/Components';
import { normalize, useTheme } from '@/Hooks';
import { Colors } from '@/Theme/Variables';
import { figmaDimenToRN } from '@/Utils';

interface Props {
  text: string,
  onPress: () => void,
  textSize?: 'textMini' | 'textSmall' | 'textRegular' | 'textLarge',
  type?: 'primary' | 'primary' | 'secondary' | 'outline' | 'flat' | 'tint',
  // To give reset like style to button
  hollow?: boolean,
  iconPrefix?: ImageSourcePropType,
  IconPrefixSvg?: FC<SvgProps>,
  iconPrefixSvgProps?: SvgProps,
  disabled?: boolean,
  buttonStyles?: LinearGradientProps[ 'style' ],
  loading?: boolean,
  viewStyle?: StyleProp<ViewStyle>,
}

const BaseButton: FC<Props> = ( { text, disabled, textSize, onPress, type, hollow, iconPrefix, IconPrefixSvg: IconPrefixSvg, iconPrefixSvgProps, buttonStyles, loading, viewStyle } ) => {
  const { Fonts, Layout, Gutters, Images } = useTheme();

  const buttonColor = useMemo( () => {
    let color: LinearGradientProps[ 'colors' ];
    switch( type ) {
      case 'secondary':
      case 'outline':
      case 'primary':
      default:
        color = hollow ? [Colors.white] : [Colors.primary];
    }
    return color;
  }, [ type, hollow ] );

  const buttonStyle = useMemo( () => {
    const style: StyleProp<ViewStyle>[] = [ styles.baseButton, Layout.rowCenter ];
    switch( type ) {
      case 'secondary':
        style.push( styles.secondaryButton );
        break;
      case 'outline':
        style.push( styles.outlineButton );
        break;
      case 'flat':
        style.push( styles.flatButton );
        break;
      case 'tint':
        style.push( styles.tintButton );
        break;
      case 'primary':
        if( hollow ) {
          style.push( styles.primaryButtonHollow );
        }
        break;
      // default:
      //   // Don't need to do any extra styling
    }
    if( disabled || loading ) {
      style.push( styles.primaryDisableButton );
    }
    return style;
  }, [ disabled, loading, type, Layout, hollow ] );

  const textColor = useMemo( () => {
    const style: object[] = [];
    switch( type ) {
      case 'flat':
      case 'secondary':
        style.push( styles.secondarytext );
        break;
      case 'outline':
        style.push( styles.outlineText );
        break;
      case 'tint':
        style.push( styles.tintText );
        break;
      case 'primary':
      default:
        style.push( hollow ? styles.primaryTextHollow : styles.primaryText );
    }
    return style;
  }, [ type, hollow ] );

  return (
    <Pressable
      onPress={onPress}
      viewStyle={viewStyle}
      disabled={disabled || loading}>
      <LinearGradient
        colors={buttonColor}
        style={[ buttonStyle, buttonStyles ]}
      >
        { !!iconPrefix &&
          <Image
            source={iconPrefix}
            style={[ Gutters.smallRMargin ]}
            resizeMode="cover"
          />
        }
        { !!IconPrefixSvg &&
          <IconPrefixSvg
            width={figmaDimenToRN( 16 )}
            height={figmaDimenToRN( 16 )}
            style={[ Gutters.smallRMargin ]}
            { ...iconPrefixSvgProps }
          />
        }
        <BaseText style={[ Fonts[ textSize! ], textColor ]}>
          {text}
        </BaseText>
      </LinearGradient>
      { loading && <BaseText>Loading...</BaseText> }
    </Pressable>
  );
};

const styles = StyleSheet.create( {
  baseButton: {
    paddingHorizontal: normalize( 36 ),
    paddingVertical: normalize( 12 ),
    borderRadius: 36,
    shadowColor: Colors.black,
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 15,
    shadowOffset: { width: normalize( 56 ), height: normalize( 13 ) },
  },
  primaryButtonHollow: {
    backgroundColor: Colors.white,
  },
  secondaryButton: {
    backgroundColor: Colors.white,
  },
  flatButton: {
    borderWidth: 1,
    borderColor: Colors.flatBorder,
    backgroundColor: Colors.white,
    borderRadius: 8,
  },
  outlineButton: {
    borderWidth: 1,
    backgroundColor: Colors.white,
  },
  tintButton: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    elevation: 0,
  },
  primaryText: {
    color: Colors.white,
  },
  primaryTextHollow: {
    color: Colors.black,
  },
  secondarytext: {
    color: Colors.black,
  },
  outlineText: {
    color: Colors.primary,
  },
  tintText: {
    color: Colors.primary,
    fontWeight: '500',
  },
  primaryDisableButton: {
    opacity: 0.3,
  },
  linearGradient: {
    paddingRight: normalize( 15 ),
    // To give shadow to the button
    borderRadius: 5,
  },
  animation: {
    overflow: 'hidden',
    transform: [
      {
        scale: 1.5,
      },
    ],
  },
} );

BaseButton.defaultProps = {
  textSize: 'textMini',
  disabled: false,
  type: 'primary',
  hollow: false,
  iconPrefix: undefined,
  IconPrefixSvg: undefined,
  iconPrefixSvgProps: undefined,
  buttonStyles: undefined,
  loading: false,
  viewStyle: undefined,
};

export default BaseButton;
