import React, { FC } from "react";
import { useTheme } from "@/Hooks";
import { SafeAreaView, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store } from "@/Store/store";
import Home from "@/Containers/Home";

const App: FC = () => {
  // const { Colors } = useTheme();
  const backgroundStyle = {
    backgroundColor: "#FFFFFF",
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Home />
      </SafeAreaView>
    </Provider>
  );
}

export default App;
