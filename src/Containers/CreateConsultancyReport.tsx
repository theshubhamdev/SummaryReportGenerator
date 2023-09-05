import { Button, StyleSheet, View } from "react-native";
import React from "react";
import { BaseText } from "@/Components";
import { useTheme } from "@/Hooks";
import ConsultancyForm from "@/Components/Consultancy/ConsultancyForm";

const CreateConsultancyReport = () => {
  const { Layout, Gutters, Fonts } = useTheme();

  return (
    <View style={[Layout.fullHeight]}>
      <View style={[Layout.alignItemsCenter, Gutters.regularPadding]}>
        <BaseText style={[Fonts.sz20]}>M.S.M. Hospital</BaseText>
      </View>
      <ConsultancyForm />
    </View>
  );
};

export default CreateConsultancyReport;

const styles = StyleSheet.create({});
