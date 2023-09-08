import { View, Text } from "react-native";
import React from "react";
import CreateConsultancyReport from "@/Containers/CreateConsultancyReport";
import Home from "@/Containers/Home";
import { createStackNavigator } from "@react-navigation/stack";
import PrintPreview from "@/Containers/PrintPreview";

const Navigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateConsultancyReport"
        component={CreateConsultancyReport}
      />
      <Stack.Screen
        name="PrintPreview"
        component={PrintPreview}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
