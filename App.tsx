import React, { FC } from "react";
import { useTheme } from "@/Hooks";
import { SafeAreaView, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store } from "@/Store/store";
import Home from "@/Containers/Home";
import Navigation from "@/Navigation";
import { NavigationContainer } from "@react-navigation/native";

const App: FC = () => {
  // const { Colors } = useTheme();
  const backgroundStyle = {
    backgroundColor: "#FFFFFF",
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
