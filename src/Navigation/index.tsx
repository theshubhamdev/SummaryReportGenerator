import { View, Text } from "react-native";
import React from "react";
import CreateConsultancyReport from "@/Containers/CreateConsultancyReport";
import Home from "@/Containers/Home";
import { createStackNavigator } from "@react-navigation/stack";

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
    </Stack.Navigator>
  );
};

export default Navigation;
