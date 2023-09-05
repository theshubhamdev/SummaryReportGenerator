import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BaseText } from "@/Components";
import { useTheme } from "@/Hooks";
import BaseInput from "@/Components/BaseInput";
import { useForm } from "react-hook-form";
import ConsultancyForm from "@/Components/Consultancy/ConsultancyForm";

const Home = () => {
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

export default Home;

const styles = StyleSheet.create({});
