import RNDateTimePicker, { AndroidNativeProps, DateTimePickerEvent, IOSNativeProps } from '@react-native-community/datetimepicker';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Platform, StyleProp, StyleSheet, TextStyle, View } from 'react-native';

import { BaseText, Pressable } from '@/Components';
import { noop, useTheme } from '@/Hooks';
import { ThemeColors } from '@/Theme/theme.type';
import { convertDateTimeToDDMonthYYYY, figmaDimenToRN } from '@/Utils';

interface Props<TFormValues extends FieldValues> {
  name: Path<TFormValues>,
  control: Control<TFormValues>,
  datePickerProps?: IOSNativeProps | AndroidNativeProps,
  layout?: 'flat' | 'underlined',
  textStyle?: StyleProp<TextStyle>,
  onSelect?: (date: Date) => void,
  show: boolean
}

const DatePickerNativeInput = <TFormValues extends FieldValues>( { onSelect, name, control, datePickerProps, layout, textStyle, show }: Props<TFormValues> ) => {
  const [ visible, setVisible ] = useState<boolean>( false );

  const { Layout, Gutters, Images, Colors, Fonts } = useTheme();

  const styles = useMemo( () => stylesFn( Colors, layout ), [ Colors, layout ] );

  const overlayEnabled = show;

  useEffect( () => {
    if( !overlayEnabled ) {
      setVisible( false );
    }
  }, [ overlayEnabled ] );

  const onChangeHandler = useCallback( ( date: Date | undefined ) => {
    if( !date ) {
      return;
    }
    onSelect && onSelect( date );
  }, [ onSelect ] );

  const toggleVisible = useCallback( () => {
    setVisible( ( prevVisible ) => {
      if( prevVisible ) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      return !prevVisible;
    } );
  }, [ ] );

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      render={
        ( { field: { value, onChange: onChangeDate } } ) => (
          <View>
            <Pressable onPress={toggleVisible}>
              <View style={[ Layout.row, Layout.alignItemsCenter, Layout.justifyContentBetween, styles.container ]}>
                <BaseText style={[ Fonts.sz14, Fonts.wt500, !value && styles.mutedText, textStyle ]}>{value ? convertDateTimeToDDMonthYYYY( value ) : 'Select date'}</BaseText>
              </View>
            </Pressable>
            {visible && <RNDateTimePicker
              display={ Platform.OS === 'android' ? 'default' : 'spinner'}
              value={value || new Date()}
              onChange={( event: DateTimePickerEvent, date: Date | undefined ) => {
                if( Platform.OS === 'android' ) {
                  // On ios spinner would remain open unless the input is clicked again
                  setVisible( false );
                }
                if( event.type === 'set' ) {
                  if( date ) {
                    onChangeDate( date );
                    onChangeHandler( date );
                  } else {
                    // This case should not hit in real life scenario but adding it anyway.
                  }
                }
              }}
              { ...datePickerProps }
            />}
          </View>
        )
      }
    />
  );
};

const stylesFn = ( Colors: ThemeColors, layout?: 'flat' | 'underlined' ) => {
  const commonStyles = {
    mutedText: {
      color: Colors.dateMuted,
    },
    iconStyle: {
      width: figmaDimenToRN( 12 ),
      height: figmaDimenToRN( 12 ),
    },
  };
  const underlineStyle = StyleSheet.create( {
    container: {
      borderBottomWidth: 1,
      borderBottomColor: Colors.textMuted,
    },
    ...commonStyles,
  } );

  const flatStyle = StyleSheet.create( {
    container: {},
    ...commonStyles,
  } );

  switch( layout ) {
    case 'underlined':
      return underlineStyle;
    default:
      return flatStyle;
  }
};

DatePickerNativeInput.defaultProps = {
  datePickerProps: undefined,
  layout: 'underlined',
  textStyle: undefined,
  onSelect: noop,
};

export default DatePickerNativeInput;
