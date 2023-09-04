import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import Fonts from './Fonts';
import Gutters from './Gutters';
import Images from './Images';
import Layout from './Layout';
import { Colors, FontSize, MetricsSizes } from './Variables';

export type UnionToIntersection<T> =
  ( T extends any ? ( x: T ) => any : never ) extends
  ( x: infer R ) => any ? R : never;

export type StyleType = TextStyle & ViewStyle & ImageStyle

export type ThemeNavigationTheme = {
  dark: boolean,
  colors: ThemeNavigationColors,
}
export type ThemeNavigationColors = {
  primary: string,
  background: string,
  card: string,
  text: string,
  border: string,
  notification: string,
}

export type ThemeFontSize = typeof FontSize;

export interface ThemeSpace {
  mini: number,
  small: number,
  regular: number,
  large: number,
  extraLarge: number,
}
// export type ThemeMetricsSizes = { [key: string]: number | string }
export type ThemeMetricsSizes = typeof MetricsSizes;

export type ThemeVariables = {
  Colors: ThemeColors,
  NavigationColors: ThemeNavigationColors,
  FontSize: ThemeFontSize,
  MetricsSizes: ThemeMetricsSizes,
}

export type ThemeColors = typeof Colors;
export type ThemeFonts = ReturnType<typeof Fonts>
export type ThemeLayout = ReturnType<typeof Layout>;
// export type ThemeGutters = { [key: string]: StyleType }
export type ThemeGutters = ReturnType<typeof Gutters>;
export type ThemeCommon = {
  [key: string]: StyleType,
  button: { [key: string]: StyleType },
}
export type ThemeImages = ReturnType<typeof Images>;

export type Theme = {
  // isDarkMode: boolean,
  Colors: ThemeColors,
  NavigationColors: ThemeNavigationColors,
  FontSize: ThemeFontSize,
  MetricsSizes: ThemeMetricsSizes,
  Fonts: ThemeFonts,
  Images: ThemeImages,
  Layout: ThemeLayout,
  Gutters: ThemeGutters,
  Common: ThemeCommon,
  Variables?: Partial<ThemeVariables>,
}
export interface ThemeCommonParams {
  Colors: ThemeColors,
  NavigationColors: ThemeNavigationColors,
  FontSize: ThemeFontSize,
  MetricsSizes: ThemeMetricsSizes,
  Fonts: ThemeFonts,
  Images: ThemeImages,
  Layout: ThemeLayout,
  Gutters: ThemeGutters,
  Variables?: Partial<ThemeVariables>,
}
