import React, { FC, useCallback, useMemo } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { StyleSheet, View } from "react-native";

import { BaseCard, BaseText, Pressable } from "@/Components";
import { useTheme } from "@/Hooks";
import { ThemeColors } from "@/Theme/theme.type";
import { IFormDetails } from "./ConsultancyForm";
import CreateTreatmentItem from "./CreateTreatmentItem";

interface Props {
  control: Control<IFormDetails>;
}

const CreateTreatmentForm: FC<Props> = ({ control }) => {
  const { Layout, Colors, Fonts, Gutters } = useTheme();
  const styles = useMemo(() => stylesFn(Colors), [Colors]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "treatments",
  });

  const addItem = useCallback(() => {
    append({
      medicineName: "",
      amount: 0,
      medicineType: "T",
      dosage: "BD",
      qty: 0,
    });
  }, [append]);

  const renderFeePlans = useMemo(() => {
    return fields.map((field, index) => (
      <CreateTreatmentItem
        key={field.id}
        control={control}
        index={index}
        remove={() => remove(index)}
      />
    ));
  }, [control, fields, remove]);

  return (
    <BaseCard shadow style={[Gutters.regularMargin]}>
      <View style={[Layout.column, Gutters.tinyPadding]}>
        <View style={[Layout.row, Layout.justifyContentBetween]}>
          <View style={[Layout.fill]}>
            <BaseText style={[Fonts.sz16, Fonts.wt600]}>Treatment</BaseText>
          </View>
          <View style={[Layout.fill, Layout.row]}>
            <View style={[Layout.fill, Layout.row]}>
              <BaseText
                style={[Gutters.largeRPadding, Fonts.sz16, Fonts.wt600]}
              >
                QTY Type
              </BaseText>
              <BaseText
                style={[Gutters.largeRPadding, Fonts.sz16, Fonts.wt600]}
              >
                Timing
              </BaseText>
            </View>
            <View style={[Layout.fill, Layout.row]}>
              <BaseText
                style={[Gutters.largeRPadding, Fonts.sz16, Fonts.wt600]}
              >
                QTY
              </BaseText>
              <BaseText
                style={[Gutters.largeRPadding, Fonts.sz16, Fonts.wt600]}
              >
                AMT.
              </BaseText>
            </View>
          </View>
        </View>
        <View style={[Gutters.smallVMargin, styles.dashLine]} />
        {renderFeePlans}
        <Pressable onPress={addItem} style={[Gutters.regularTMargin, {zIndex: -99}]}>
          <View style={[Layout.row, Layout.alignItemsCenter]}>
            <BaseText
              style={[Fonts.wt600, Fonts.sz20, Layout.shrink, styles.addNew]}
            >
              ADD NEW
            </BaseText>
          </View>
        </Pressable>
      </View>
    </BaseCard>
  );
};

const stylesFn = (Colors: ThemeColors) =>
  StyleSheet.create({
    dashLine: {
      borderTopWidth: 1.5,
      //   borderStyle: "dashed",
      borderColor: Colors.black,
      opacity: 0.3,
    },
    addNew: {
      color: Colors.primary,
      textDecorationLine: "underline",
    },
  });
export default CreateTreatmentForm;
