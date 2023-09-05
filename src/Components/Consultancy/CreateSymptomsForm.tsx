import React, { FC, useCallback, useMemo } from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { BaseCard, BaseText, Pressable } from '@/Components';
import { useTheme } from '@/Hooks';
import { ThemeColors } from '@/Theme/theme.type';
import CreateSymptomItem from './CreateSymptomItem';
import { IFormDetails } from './ConsultancyForm';

interface Props {
  control: Control<IFormDetails>,
}

const CreateSymptomsForm: FC<Props> = ( { control } ) => {
  const { Layout, Colors, Fonts, Gutters } = useTheme();
  const styles = useMemo( () => stylesFn( Colors ), [ Colors ] );

  const { fields, append, remove } = useFieldArray( {
    control,
    name: 'symptoms',
  } );

  const addItem = useCallback( () => {
    append( { name: '' } );
  }, [ append ] );

  const renderFeePlans = useMemo( () => {
    return fields.map( ( field, index ) =>
      <CreateSymptomItem
        key={field.id}
        control={control}
        index={index}
        remove={() => remove( index )}
      />
    );
  }, [ control, fields, remove ] );

  return (
    <BaseCard shadow style={[Gutters.regularMargin]}>
      <View style={[ Layout.column, Gutters.tinyPadding ]}>
        <View style={[ Layout.row, Layout.justifyContentBetween ]}>
          <BaseText style={[ Fonts.sz16, Fonts.wt600 ]}>Symptoms</BaseText>
          {/* <BaseText style={[ Gutters.largeRPadding, Fonts.sz16, Fonts.wt600 ]}>Amount</BaseText> */}
        </View>
        <View style={[ Gutters.smallVMargin, styles.dashLine ]} />
        { renderFeePlans }
        <Pressable
          onPress={addItem}
          style={[ Gutters.regularTMargin ]}
        >
          <View style={[ Layout.row, Layout.alignItemsCenter ]}>
            <BaseText style={[ Fonts.wt600, Fonts.sz20, Layout.shrink, styles.addNew ]}>ADD NEW</BaseText>
          </View>
        </Pressable>
      </View>
    </BaseCard>
  );
};

const stylesFn = ( Colors: ThemeColors ) => StyleSheet.create( {
  dashLine: {
    borderTopWidth: 1.5,
    borderColor: Colors.black,
    opacity: 0.3,
  },
  addNew: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
} );
export default CreateSymptomsForm;
