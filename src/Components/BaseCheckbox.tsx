import CheckBox from '@react-native-community/checkbox';
import React, { ForwardRefRenderFunction, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { View } from 'react-native';

import { BaseText } from '@/Components';
import { useTheme } from '@/Hooks';

interface Props {
  // The initialValue is set in forwardRef so the below error looks spurious for now. Will check if it causes any issues in the future.
  // eslint-disable-next-line react/require-default-props
  initialValue?: boolean,
  title: string,
  onChange: ( value:boolean ) => void,
}

export interface IBaseCheckbox {
  reset: () => void,
}

const BaseCheckbox: ForwardRefRenderFunction<IBaseCheckbox, Props> = ( { initialValue, title, onChange }, ref ) => {
  const [ selected, setSelected ] = useState( initialValue );
  const { Layout, Fonts, Colors } = useTheme();

  useEffect( () => {
    // didMount
    setSelected( initialValue );
  }, [] );

  const reset = useCallback( () => {
    setSelected( initialValue );
  }, [ initialValue ] );

  const onValueChange = useCallback( ( value: boolean ) => {
    onChange( value );
    setSelected( value );
  }, [ onChange ] );

  useImperativeHandle( ref, () => ( {
    reset,
  } ) );

  return (
    <View style={[ Layout.shrink, Layout.row, Layout.alignItemsCenter, Layout.justifyContentStart ]}>
      <CheckBox
        value={selected}
        tintColor={'red'}
        onValueChange={onValueChange}
        tintColors={{ true: Colors.primary, false: Colors.checkboxColor }}
      />
      <BaseText style={[ Fonts.textMini, { color: Colors.primary } ]}>{title}</BaseText>
    </View>
  );
};

const BaseCheckboxFR = forwardRef( BaseCheckbox );

BaseCheckboxFR.defaultProps = {
  initialValue: false,
};

export default BaseCheckboxFR;
