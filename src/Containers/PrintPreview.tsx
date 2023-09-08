import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import Report from "./ConsultancyPreview.html"

const PrintPreview = () => {
  return (
    <WebView source={Report} style={{ flex: 1 }} />
  );
};

export default PrintPreview;

const styles = StyleSheet.create({});
