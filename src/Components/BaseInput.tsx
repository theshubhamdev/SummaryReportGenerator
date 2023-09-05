import React, { FC, useCallback, useMemo, useState } from 'react';
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form';
import { Image, ImageSourcePropType, KeyboardType, StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { BaseText } from '@/Components';
import { noop, normalize, useTheme } from '@/Hooks';
import { ThemeColors } from '@/Theme/theme.type';
import { capitalizeFirstLetter, figmaDimenToRN, isNaUN } from '@/Utils';

type CommonProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>,
  label?: string,
  labelStyle?: StyleProp<TextStyle>,
  control: Control<TFormValues>,
  prefixSeparator?: boolean,
  suffixSeparator?: boolean,
  placeholder? : string,
  secureTextEntry? : boolean,
  errorMessage? : string,
  errorName?: string,
  required? : boolean,
  type? : KeyboardType,
  disabled?: boolean,
  regexPattern?: ( RegExp | null ),
  layout?: 'default' | 'material' | 'flat',
  onChange?: ( value: string ) => void,
  onFocus?: () => void,
  onBlur?: () => void,
  maxLength?: number,
  style?: StyleProp<TextStyle>,
  containerStyle?: StyleProp<ViewStyle>,
  textInputProps?: TextInputProps,
  inputType?: 'STRING' | 'NUMBER' | 'FLOAT',
  minValue?: number,
  maxValue?: number,
};

interface PropsWithImageIcon<TFormValues extends FieldValues> extends CommonProps<TFormValues> {
  prefixIcon?: ImageSourcePropType,
  suffixIcon?: ImageSourcePropType,
  PrefixIconSvg?: never,
  PrefixIconSvgProps?: never,
  SuffixIconSvg?: never,
  SuffixIconSvgProps?: never,
}

interface PropsWithSvgIcon<TFormValues extends FieldValues> extends CommonProps<TFormValues> {
  prefixIcon?: never,
  suffixIcon?: never,
  PrefixIconSvg?: FC<SvgProps>,
  PrefixIconSvgProps?: SvgProps,
  SuffixIconSvg?: FC<SvgProps>,
  SuffixIconSvgProps?: SvgProps,
}

type Props<TFormValues extends FieldValues> = CommonProps<TFormValues> & ( PropsWithSvgIcon<TFormValues> | PropsWithImageIcon<TFormValues> )

const BaseInput = <TFormValues extends FieldValues>( {
  control,
  name,
  label,
  labelStyle,
  prefixIcon,
  PrefixIconSvg,
  PrefixIconSvgProps,
  suffixIcon,
  SuffixIconSvg,
  SuffixIconSvgProps,
  prefixSeparator,
  suffixSeparator,
  placeholder,
  secureTextEntry,
  required,
  errorMessage,
  errorName,
  type,
  disabled,
  regexPattern,
  layout,
  onChange,
  onFocus,
  onBlur,
  maxLength,
  style,
  containerStyle,
  textInputProps,
  inputType,
  minValue,
  maxValue,
}: Props<TFormValues> ) => {
  const { Fonts, Colors, Gutters } = useTheme();

  const styles = useMemo( () => stylesFn( Colors ), [ Colors ] );

  const [ typing, setTyping ] = useState( false );

  const rules = useMemo( () => {
    return {
      required: required ? `${capitalizeFirstLetter( name )} is required` : false,
      ...( minValue && { min: minValue } ),
      ...( maxValue && { max: minValue } ),
      ...( regexPattern && { pattern: regexPattern } )
      ,
    };
  }, [ required, name, minValue, maxValue, regexPattern ] );

  const getErrorMessage = useCallback( ( error: FieldError ) => {
    let localErrorMessage = 'Please enter a valid value.';
    if( error?.type === 'custom' && error?.message ) {
      if( errorName ) {
        localErrorMessage = error?.message.replace( name, errorName );
      } else {
        localErrorMessage = error?.message;
      }
    } else if( errorMessage ) {
      localErrorMessage = errorMessage;
    } else if( error?.message ) {
      if( errorName ) {
        localErrorMessage = error.message.replace( name, errorName );
      } else {
        localErrorMessage = error.message;
      }
    }
    return localErrorMessage;
  }, [ errorMessage, name, errorName ] );

  const getInputStyle = useCallback( ( error: boolean ) => {
    const inputStyles: StyleProp<ViewStyle> = [];

    switch( layout ) {
      case 'material':
        inputStyles.push( styles.materialInputField );
        if( disabled ) {
          inputStyles.push( styles.materialDisabled );
        } else if( error ) {
          inputStyles.push( styles.materialInputFieldError );
        }
        break;
      case 'flat':
        inputStyles.push( styles.flatInputField );
        if( disabled ) {
          inputStyles.push( styles.inputFieldDisabled );
        }
        break;
      case 'default':
      default:
        inputStyles.push( styles.inputField );
        if( disabled ) {
          inputStyles.push( styles.inputFieldDisabled );
        }
        break;
    }

    return inputStyles;
  }, [ disabled, layout, styles ] );

  const getTextInputStyle = useCallback( ( error: boolean ) => {
    const inputStyles: StyleProp<TextStyle> = [];
    inputStyles.push( styles.input );
    inputStyles.push( Fonts.sz14 );
    inputStyles.push( Fonts.fMontserrat );

    switch( layout ) {
      case 'material':
        inputStyles.push( styles.input );
        inputStyles.push( {
          paddingTop: normalize( 6 ),
          paddingBottom: normalize( 3 ),
          paddingHorizontal: normalize( 0 ),
        } );
        break;
      case 'flat':
        inputStyles.push( styles.input );
        break;
      case 'default':
      default:
        inputStyles.push( styles.input );
        inputStyles.push( {
          paddingVertical: normalize( 4 ),
        } );
        break;
    }
    inputStyles.push( style );
    if( textInputProps?.multiline ) {
      inputStyles.push( {
        textAlignVertical: 'center',
      } );
    }
    if( disabled ) {
      inputStyles.push( styles.inputDisabled );
    }
    return inputStyles;
  }, [ layout, style, textInputProps, Fonts, disabled, styles ] );

  const getRemainingCharsStyle = useCallback( ( length: number ): StyleProp<TextStyle> => {
    if( !maxLength ) {
      return;
    }
    const textStyle: StyleProp<TextStyle> = [];
    textStyle.push( styles.remainingCharsStyle );
    textStyle.push( Fonts.sz10 );
    switch( layout ) {
      default:
        textStyle.push( {
          position: 'absolute',
          bottom: -14,
          right: 0,
        } );
    }
    if( length === maxLength ) {
      textStyle.push( {
        color: Colors.error,
      } );
    }
    return textStyle;
  }, [ Fonts, layout, styles, maxLength, Colors ] );

  return (
    <View style={[ styles.container, containerStyle ] }>
      { !!label && <BaseText style={[ Fonts.sz14, Fonts.wt500, styles.labelStyle, labelStyle ]}>{label}</BaseText> }
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={
          ( { field: { value, onChange: onChangeText, onBlur: formOnBlur, ref }, fieldState: { error } } ) => (
            <View style={ [ styles.inputWithErrorContainer ]}>
              <View style={[ styles.inputContainer, getInputStyle( !!error ) ]}>
                { !!prefixIcon && <Image
                  source={prefixIcon}
                  style={[ styles.icon, styles.iconPrefix ]} /> }
                { !!PrefixIconSvg && <PrefixIconSvg
                  width={figmaDimenToRN( 16 )}
                  height={figmaDimenToRN( 16 )}
                  style={[ styles.icon, styles.iconPrefix ]}
                  { ...PrefixIconSvgProps } /> }
                {!!prefixSeparator && <View style={styles.prefixSeparator}/>}
                <TextInput
                  ref={ref}
                  style={getTextInputStyle( !!error )}
                  value={`${isNaUN( value ) ? value : ''}`}
                  onChangeText={( val ) => {
                    if( type && [ 'number-pad', 'numeric', 'decimal-pad' ].includes( type ) ) {
                      val = val.replace( /[^((0-9)+(\\.(0-9){1,2})*)]/g, '' );
                    }
                    switch( inputType ) {
                      case 'FLOAT':
                        onChangeText( val ? parseFloat( val ) : null );
                        break;
                      case 'NUMBER':
                        onChangeText( val ? parseInt( val, 10 ) : null );
                        break;
                      case 'STRING':
                      default:
                        onChangeText( val );
                    }
                    onChange && onChange( val );
                    if( maxLength && val?.length === maxLength ) {
                      formOnBlur();
                      onBlur && onBlur();
                    }
                  }}
                  onBlur={() => {
                    setTyping( false );
                    formOnBlur();
                    onBlur && onBlur();
                  }}
                  onFocus={ () => {
                    setTyping( true );
                    onFocus && onFocus();
                  } }
                  placeholder={placeholder}
                  placeholderTextColor={Colors.textPlaceholder}
                  secureTextEntry={secureTextEntry}
                  keyboardType={type}
                  editable={!disabled}
                  selectTextOnFocus={!disabled}
                  maxLength={maxLength}
                  { ...textInputProps }
                />
                { !!suffixSeparator && <View style={styles.suffixSeparator}/> }
                { !!SuffixIconSvg && <SuffixIconSvg
                  width={figmaDimenToRN( 16 )}
                  height={figmaDimenToRN( 16 )}
                  style={[ styles.icon, styles.iconSuffix ]}
                  { ...SuffixIconSvgProps } /> }
                { !!suffixIcon && <Image
                  source={suffixIcon}
                  style={[ styles.icon, styles.iconSuffix ]} /> }
              </View>
              { typeof value === 'string' && !!maxLength && typing && <BaseText style={getRemainingCharsStyle( value.length )}>{value.length}/{maxLength}</BaseText> }
              {!!error && <BaseText style={styles.error}>{getErrorMessage( error )}</BaseText>}
            </View>
          )
        } />
    </View>
  );
};

const stylesFn = ( Colors: ThemeColors ) => StyleSheet.create( {
  container: {
    width: '100%',
    // height: normalize( 40 ),
    marginVertical: figmaDimenToRN( 4 ),
  },
  labelStyle: {
    marginBottom: figmaDimenToRN( 3 ),
  },
  inputContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputWithErrorContainer: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    minHeight: figmaDimenToRN( 40 ),
  },
  icon: {
    flex: 0,
    height: figmaDimenToRN( 14 ),
    width: figmaDimenToRN( 14 ),
  },
  iconPrefix: {
    marginLeft: normalize( 12 ),
  },
  iconSuffix: {
    marginRight: normalize( 12 ),
  },
  input: {
    flex: 1,
    color: Colors.black,
    paddingHorizontal: figmaDimenToRN( 12 ),
    paddingVertical: figmaDimenToRN( 6 ),
    textAlignVertical: 'center',
  },
  inputDisabled: {
    color: Colors.black,
  },
  inputField: {
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,

    elevation: 7,
    backgroundColor: Colors.white,
  },
  flatInputField: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.searchBorder,
  },
  inputFieldDisabled: {
    backgroundColor: Colors.disabled,
  },
  materialInputField: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.primary,
    borderBottomWidth: 1,
  },
  materialInputFieldError: {
    color: Colors.error,
    borderColor: Colors.error,
  },
  materialDisabled: {
    color: Colors.disabled,
    borderColor: Colors.disabled,
  },
  error: {
    color: Colors.error,
    marginTop: normalize( 4 ),
    marginLeft: normalize( 4 ),
  },
  prefixSeparator: {
    backgroundColor: Colors.inputSeparator,
    paddingVertical: figmaDimenToRN( 12 ),
    width: 1,
    marginLeft: normalize( 12 ),
  },
  suffixSeparator: {
    padding: 1,
    backgroundColor: Colors.inputSeparator,
    paddingVertical: figmaDimenToRN( 12 ),
    width: 1,
    marginRight: normalize( 12 ),
  },
  remainingCharsStyle: {
    color: Colors.textMuted,
  },
} );

BaseInput.defaultProps = {
  label: undefined,
  labelStyle: undefined,
  prefixSeparator: false,
  suffixSeparator: false,
  placeholder: '',
  secureTextEntry: false,
  required: false,
  errorMessage: '',
  errorName: undefined,
  type: 'default',
  disabled: false,
  regexPattern: null,
  layout: 'default',
  onChange: noop,
  onFocus: noop,
  onBlur: noop,
  maxLength: undefined,
  style: undefined,
  containerStyle: undefined,
  textInputProps: undefined,
  inputType: 'STRING',
  minValue: undefined,
  maxValue: undefined,
};

export default BaseInput;
