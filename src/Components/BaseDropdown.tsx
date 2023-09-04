import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  useWatch,
} from 'react-hook-form';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import DropDownPicker, {
  ItemType,
  ValueType,
} from 'react-native-dropdown-picker';

import { BaseText } from '@/Components';
import {
  noop,
  normalize,
  useTheme,
} from '@/Hooks';
import { Colors } from '@/Theme/Variables';
import { capitalizeFirstLetter, figmaDimenToRN, isNaUN } from '@/Utils';

interface Props<TFormValues extends FieldValues> {
  name: Path<TFormValues>,
  control: Control<TFormValues>,
  label?: string,
  placeholder? : string,
  /** List of options to show in the dropdown */
  items: ItemType<ValueType>[],
  /** Allow the user to type and filter dropdown items */
  filter?: boolean,
  /** Optional error message if the rules are not followed */
  errorMessage? : string,
  errorName?: string,
  required? : boolean,
  disabled?: boolean,
  layout?: 'default' | 'material',
  zIndex?: number,
  zIndexInverse?: number,
  onPress?: () => void,
  onFocus?: () => void,
  onBlur?: () => void,
  /** Callback which returns the item is selected*/
  onSelect?: ( selected: ValueType | null ) => void,
  setItems?: Dispatch<SetStateAction<ItemType<ValueType>[]>>,
  addCustomItem?: boolean,
  containerStyle?: StyleProp<ViewStyle>,
  labelStyle?: StyleProp<TextStyle>,
}

const BaseDropdown = <TFormValues extends FieldValues>( {
  name,
  control,
  label,
  placeholder,
  items,
  onSelect,
  filter,
  errorMessage,
  errorName,
  required,
  disabled,
  layout,
  zIndex,
  zIndexInverse,
  onPress,
  onFocus,
  onBlur,
  setItems,
  addCustomItem,
  containerStyle,
  labelStyle,
}: Props<TFormValues> ) => {
  // There is a limitation to this dropdown that it cannot be closed by clicking outside.
  // Either the ancestor component handles closing when clicked outside or we have to do some hack.
  // Keeping this in TODO to take this up later.

  const { Fonts } = useTheme();

  const [ open, setOpen ] = useState( false );
  const [ selectedItem, setSelectedItem ] = useState<ValueType | null>( null );

  const valueWatch = useWatch( {
    control,
    name,
  } );

  useEffect( () => {
    // The effect will ensure that stuff like reset form will set correct reset value in selectedItem.
    if( valueWatch === selectedItem || ( !isNaUN( valueWatch ) && !isNaUN( selectedItem ) ) ) {
      return;
    }
    console.log( `${name}dropdown_useEffect.valueWatch`, valueWatch, selectedItem );
    setSelectedItem( valueWatch );
  }, [ valueWatch ] );

  useEffect( () => {
    console.log( `${name}dropdown_useEffect.selectedItem`, selectedItem );
    onSelect && onSelect( selectedItem );
  }, [ selectedItem ] );

  const getRules = useMemo( () => {
    return {
      required: required ? `${capitalizeFirstLetter( name )} is required` : false,
    };
  }, [ required, name ] );

  const getErrorMessage = useCallback( ( error: FieldError ) => {
    let localErrorMessage = 'Please enter a valid value.';
    if( errorMessage ) {
      localErrorMessage = errorMessage;
    } else if( error?.message ) {
      if( errorName ) {
        localErrorMessage = error.message.replace( name, errorName );
      } else {
        localErrorMessage = error.message;
      }
    }
    return localErrorMessage;
  }, [ errorMessage, errorName, name ] );

  const dropdownStyle = useCallback( ( error: FieldError | undefined ): StyleProp<ViewStyle> => {
    const style: StyleProp<ViewStyle> = [];
    switch( layout ) {
      case 'material': {
        style.push( styles.materialDropdown );
        if( error ) {
          style.push( styles.materialDropdownError );
        }
        break;
      }
      case 'default': {
        style.push( styles.defaultDropdown );
        if( error ) {
          style.push( styles.defaultDropdownError );
        }
        break;
      }
    }
    return style;
  }, [ layout ] );

  const dropdownContainerStyle: StyleProp<ViewStyle> = useMemo( () => {
    const dropdownStyles: StyleProp<ViewStyle> = [];
    if( Platform.OS === 'android' ) {
      dropdownStyles.push( styles.dropdownContainerAndroid );
      if( filter ) {
        dropdownStyles.push( {
          top: normalize( -24 ),
        } );
      }
    } else {
      dropdownStyles.push( styles.dropdownContainerIos );
    }
    return dropdownStyles;
  }, [] );

  const zIndexStyle: Pick<ViewStyle, 'zIndex'> = useMemo( () => {
    return {
      zIndex: open ? 1 : 0,
    };
  }, [ open ] );

  return (
    <View style={[ styles.container, containerStyle ] }>
      { !!label && <BaseText style={[ Fonts.sz14, Fonts.wt500, styles.labelStyle, labelStyle ]}>{label}</BaseText> }
      <Controller
        control={control}
        name={name}
        rules={getRules}
        render={
          ( { field: { value, onChange, onBlur: onFormBlur }, fieldState: { error } } ) => {
            return (
              <View style={[ styles.dropdownWithErrorContainer, zIndexStyle ]}>
                <DropDownPicker
                  props={{
                    activeOpacity: 0.6,
                  }}
                  itemProps={{
                    activeOpacity: 0.6,
                  }}
                  addCustomItem={addCustomItem}
                  setItems={setItems}
                  zIndex={zIndex || zIndexStyle.zIndex }
                  zIndexInverse={zIndexInverse || zIndexStyle.zIndex}
                  placeholder={placeholder}
                  placeholderStyle={ [ Fonts.sz14, styles.placeholder ]}
                  multiple={false}
                  mode={ 'SIMPLE' }
                  searchable={filter}
                  open={open}
                  onClose={() => {
                    onFormBlur();
                    onBlur && onBlur();
                  }}
                  onOpen={onFocus}
                  value={selectedItem}
                  items={items}
                  onPress={onPress}
                  setOpen={setOpen}
                  disabled={disabled}
                  closeAfterSelecting={true}
                  closeOnBackPressed={true}
                  itemSeparator={true}
                  // dropDownDirection="TOP"
                  listMode="SCROLLVIEW"
                  scrollViewProps={{
                    keyboardShouldPersistTaps: 'always',
                  }}
                  searchPlaceholder="Search..."
                  onChangeValue={( selected: ValueType | null ) => {
                    if( value !== selected ) {
                      console.log( `${name}dropdown`, value );
                      onChange( selected );
                    // onSelect && onSelect( selected );
                    }
                  }}
                  setValue={setSelectedItem}
                  searchContainerStyle={styles.materialSearchContainer}
                  searchTextInputStyle={[ styles.materialSearchTextInput, !!error ? styles.materialSearchTextInputError : undefined ]}
                  labelStyle={styles.materialLabelStyle}
                  style={dropdownStyle( error )}
                  itemSeparatorStyle={styles.itemSeparator}
                  listItemContainerStyle={styles.listItemContainer}
                  listItemLabelStyle={styles.listItemLabelStyle}
                  dropDownContainerStyle={[ styles.dropDownContainer, { marginTop: filter ? normalize( -10 ) : styles.dropDownContainer.marginTop }, dropdownContainerStyle ]}
                />
                {!!error && <BaseText style={styles.error}>{getErrorMessage( error )}</BaseText>}
              </View>
            );
          }
        } />
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    width: '100%',
    paddingVertical: normalize( 4 ),
  },
  dropdownWithErrorContainer: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    minHeight: figmaDimenToRN( 40 ),
  },
  labelStyle: {
    marginBottom: figmaDimenToRN( 3 ),
  },
  materialSearchContainer: {
    // Remove border from search input box
    borderWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    // Remove the whitespace between text input bottom line and the first searched item
    paddingBottom: 0,
  },
  materialSearchTextInput: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
  },
  materialSearchTextInputError: {
    borderBottomColor: Colors.error,
  },
  materialDropdown: {
    // Remove border from main input box
    backgroundColor: Colors.transparent,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    borderRadius: 0,
    paddingLeft: 0,
    paddingRight: 2,
    minHeight: 0,
    paddingBottom: 6,
    paddingTop: 6,
  },
  placeholder: {
    color: Colors.textPlaceholder,
    letterSpacing: 0.05,
  },
  materialDropdownError: {
    borderBottomColor: Colors.error,
  },
  materialLabelStyle: {
    // Set color for label in main input box
    color: Colors.black,
  },
  defaultDropdown: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: Colors.white,
    borderColor: Colors.searchBorder,
  },
  defaultDropdownError: {
    borderColor: Colors.error,
  },
  itemSeparator: {
    backgroundColor: Colors.separator,
  },
  listItemContainer: {
    // Set height of each item
    height: 50,
  },
  listItemLabelStyle: {
    // To set items color
    color: Colors.black,
  },
  dropDownContainer: {
    // To remove border from list of items container.
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: Colors.white,
    elevation: 5,
    marginTop: 2,
    marginBottom: normalize( -18 ),
  },
  dropdownContainerAndroid: {
    position: 'relative',
    // position: 'absolute',
    top: 0,
  },
  dropdownContainerIos: {
    borderRightWidth: 0.2,
    borderBottomWidth: 0.2,
    borderLeftWidth: 0.2,
    borderTopWidth: 0,
  },
  error: {
    color: Colors.error,
    marginTop: normalize( 4 ),
    marginLeft: normalize( 4 ),
  },
} );

BaseDropdown.defaultProps = {
  label: undefined,
  placeholder: '',
  filter: false,
  errorMessage: '',
  errorName: undefined,
  disabled: false,
  required: false,
  layout: 'material',
  zIndex: undefined,
  zIndexInverse: undefined,
  onPress: noop,
  onSelect: noop,
  onFocus: noop,
  onBlur: noop,
  setItems: undefined,
  addCustomItem: false,
  containerStyle: undefined,
  labelStyle: undefined,
};

export default BaseDropdown;
