import React, { FC, useMemo } from "react";
import { Control } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

import { useTheme } from "@/Hooks";
import { figmaDimenToRN } from "@/Utils";
import BaseInput from "../BaseInput";
import BaseText from "../BaseText";
import { IFormDetails } from "./ConsultancyForm";

interface Props {
  control: Control<IFormDetails>;
  index: number;
  remove: () => void;
}

const CreateSymptomItem: FC<Props> = ({ control, index, remove }) => {
  const { Layout, Colors, Fonts, Gutters } = useTheme();
  const styles = useMemo(() => stylesFn(), []);

  return (
    <View key={index} style={[Layout.row, Layout.alignItemsCenter]}>
      <BaseInput
        containerStyle={[
          Gutters.largeRMargin,
          styles.feeTypeInput,
        ]}
        control={control}
        // layout="material"
        name={`symptoms.${index}.name`}
        placeholder={`Symptom`}
        errorName="Symptom"
        required
      />
      {/* <View style={[ Layout.row, Layout.alignItemsCenter, styles.amtInput ]}>
        <BaseText style={[ Gutters.tinyRMargin, Gutters.smallTMargin, Fonts.wt400, Fonts.sz14 ]}>{'\u20B9'}</BaseText>
        <BaseInput
          containerStyle={[ Gutters.smallRMargin, styles.amtInput ] }
          control={control}
          layout="material"
          name={`feeTypes[${index}].amount`}
          placeholder={'00'}
          style={[ Fonts.textRight ]}
          type="numeric"
          inputType="FLOAT"
          minValue={0}
          maxValue={999999}
          required
          errorName="Amount"
        />
      </View> */}
      <BaseText
        onPress={remove}
        style={[
          Gutters.smallTMargin,
          { color: Colors.dateMuted, fontSize: 20 },
        ]}
      >
        X
      </BaseText>
      {/* <Entypo
        name='cross'
        size={figmaDimenToRN( 11 )}
        color={Colors.dateMuted}
        onPress={remove}
        style={[ Gutters.smallTMargin ]}
      /> */}
    </View>
  );
};

const stylesFn = () =>
  StyleSheet.create({
    feeTypeInput: {
      flex: 2,
    },
    amtInput: {
      flex: 1,
    },
  });
export default CreateSymptomItem;
