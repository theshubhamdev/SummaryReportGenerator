import React, { FC, useMemo } from "react";
import { Control } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

import { useTheme } from "@/Hooks";
import { figmaDimenToRN } from "@/Utils";
import BaseInput from "../BaseInput";
import BaseText from "../BaseText";
import { IFormDetails } from "./ConsultancyForm";
import BaseDropdown from "../BaseDropdown";

interface Props {
  control: Control<IFormDetails>;
  index: number;
  remove: () => void;
}

const CreateTreatmentItem: FC<Props> = ({ control, index, remove }) => {
  const { Layout, Colors, Gutters } = useTheme();
  const styles = useMemo(() => stylesFn(), []);

  return (
    <View
      key={index}
      style={[Layout.row, Layout.alignItemsCenter, { zIndex: -1 * index }]}
    >
      <BaseDropdown
        containerStyle={[Gutters.largeRMargin, styles.feeTypeInput]}
        control={control}
        layout="material"
        items={[
          { label: "Crocin", value: "Crocin" },
          { label: "Disprin", value: "Disprin" },
          { label: "10 Days", value: "10" },
          { label: "2 Days", value: "2" },
        ]}
        name={`treatments.${index}.medicineName`}
        placeholder={`Treatment`}
        errorName="Treatment"
        required
        filter
              addCustomItem
      />
      <View style={[Layout.fill, Layout.row, styles.amtInput]}>
        <BaseDropdown
          containerStyle={[Gutters.smallRMargin, styles.amtInput]}
          control={control}
          name={`treatments.${index}.dosage`}
          items={[
            { label: "5 Days", value: "5" },
            { label: "28 Days", value: "28" },
          ]}
          filter
          addCustomItem
          layout="material"
        />
        <BaseDropdown
          containerStyle={[Gutters.smallRMargin, styles.amtInput]}
          control={control}
          name={`treatments.${index}.dosage`}
          items={[
            { label: "5 Days", value: "5" },
            { label: "28 Days", value: "28" },
            { label: "10 Days", value: "10" },
            { label: "2 Days", value: "2" },
          ]}
          filter
          addCustomItem
        />
      </View>
      <View style={[Layout.fill, Layout.row, styles.amtInput]}>
        <BaseInput
          containerStyle={[Gutters.smallRMargin, styles.amtInput]}
          control={control}
          name={`treatments.${index}.qty`}
        />
        <BaseInput
          containerStyle={[Gutters.smallRMargin, styles.amtInput]}
          control={control}
          name={`treatments.${index}.amount`}
        />
      </View>
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
export default CreateTreatmentItem;
