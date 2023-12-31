import { Button, StyleSheet, View } from "react-native";
import React from "react";
import { BaseButton, BaseText } from "@/Components";
import { useTheme } from "@/Hooks";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const { Layout, Gutters, Fonts } = useTheme();

  const navigation = useNavigation();
  return (
    <View style={[Layout.fullHeight]}>
      <View style={[Layout.alignItemsCenter, Gutters.regularPadding]}>
        <BaseText style={[Fonts.sz20]}>M.S.M. Hospital</BaseText>
      </View>
      <Button
        title="Create Consultancy Report"
        onPress={() => navigation.navigate("CreateConsultancyReport")}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
