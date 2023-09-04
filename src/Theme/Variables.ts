/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import {
  ThemeNavigationColors,
  ThemeSpace,
} from '@/Theme/theme.type';
import { figmaDimenToRN } from '@/Utils';

/**
 * Colors
 */
export const Colors = {
  inputBackground: '#FFFFFF',
  transparent: 'rgba(0,0,0,0)',
  background: "#FFFFFF",
  line: '#D9D9D9',
  black: '#000000',
  white: '#ffffff',
  text: '#212529',
  primary: '#6818A0',
  primarySubtle: '#ECEBFE',
  success: '#28A745',
  successDark: '#00BE4D',
  warn: '#9CC855',
  textMuted: '#A1A1A1',
  dateMuted: '#8E8E8E',
  borderMuted: '#8E8E8E',
  textDark: '#32325D',
  textDarkMuted: '#646464',
  textPlaceholder: '#C4C4C4',
  inputDisabledBackground: '#F4F5F7',
  tabInactive: '#9F9F9F',
  error: '#FF4040',
  errorDark: '#DC2C2C',
  disabled: '#F4F5F7',
  separator: '#E1E1E1',
  emptyText: '#B5B5B5',
  highlight: '#F3E9FF',
  overlayColor: '#00000080',
  overlayDark: '#000000AA',
  mutedOverlay: '#A1A1A1BB',
  radiotextColor: '#32325DB2',
  radioHighlightedText: '#32325D',
  flatIconBorderColor: '#ECECEC',
  flatButton: '#32325D',
  checkboxColor: '#EDEDED',
  presenceStatus: '#32325D',
  tint: '#DAA5FF30',
  lightTint: '#F9F6FB',
  iconLabel: '#32325D',
  pendingText: '#FFB802',
  // Buttons
  flatBorder: '#ECECEC',
  cross: '#8343B3',
  textLight: '#868686',

  // icon
  doc: '#6B8CFF',
  pdf: '#BA1B1B',

  // Colors for card
  // cardBackground: 'rgba(131, 67, 179, 0.05)',
  cardBackground: '#FFFFFF',

  greenDots: '#3ACD75',
  redDots: '#FF4040',

  verticalLine: '#8343B3',

  // Search box
  searchBorder: '#D0D0D0',
  inputSeparator: '#D0D0D0',

  // Checkbox
  unchecked: '#EEEEEE',

  // Chip
  chipBackground: '#F5E8FFCC',

  horizontalBarBg: '#CCFFFFFF',
  // borders
  lightBorder: '#E8E8E8',
};

export const NavigationColors: Partial<ThemeNavigationColors> = {
  primary: Colors.primary,
};

/**
 * FontSize
 */
export const FontSize = {
  micro: figmaDimenToRN( 12 ),
  mini: figmaDimenToRN( 14 ),
  small: figmaDimenToRN( 16 ),
  regular: figmaDimenToRN( 20 ),
  midLarge: figmaDimenToRN( 27 ),
  large: figmaDimenToRN( 40 ),
};

export const Space: ThemeSpace = {
  mini: 8,
  small: 16,
  regular: 24,
  large: 32,
  extraLarge: 76,
};

/**
 * Metrics Sizes
 */
const no = 0; // 5
const tiny = figmaDimenToRN( 5 ); // 5
const small = figmaDimenToRN( tiny * 2 ); // 10
const regular = figmaDimenToRN( tiny * 3 ); // 15
const midLarge = figmaDimenToRN( tiny * 4 ); // 20
const large = figmaDimenToRN( regular * 2 ); // 30
const extraLarge = figmaDimenToRN( regular * 3 ); // 90

export const MetricsSizes = {
  no,
  tiny,
  small,
  regular,
  midLarge,
  large,
  extraLarge,
};

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
};
