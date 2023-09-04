/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native';

import { ThemeVariables } from '@/Theme/theme.type';
import { figmaDimenToRN } from '@/Utils';

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function( { FontSize, Colors }: ThemeVariables ) {
  return StyleSheet.create( {
    fMontserrat: {
      fontFamily: 'Montserrat',
    },
    fPoppins: {
      fontFamily: 'Poppins',
    },
    textMicro: {
      fontSize: FontSize.micro,
      color: Colors.text,
    },
    textMini: {
      fontSize: FontSize.mini,
      color: Colors.text,
    },
    textSmall: {
      fontSize: FontSize.small,
      color: Colors.text,
    },
    textMidLarge: {
      fontSize: FontSize.midLarge,
      color: Colors.text,
    },
    textRegular: {
      fontSize: FontSize.regular,
      color: Colors.text,
    },
    textLarge: {
      fontSize: FontSize.large,
      color: Colors.text,
    },
    textDecorationUnderline: {
      textDecorationLine: 'underline',
    },
    textColorPrimary: {
      color: Colors.primary,
    },
    h1: {
      fontSize: 96,
      fontWeight: 'bold',
      letterSpacing: 1.5,
    },
    h2: {
      fontSize: 60,
      fontWeight: 'bold',
      letterSpacing: 0.5,
    },
    h3: {
      fontSize: 48,
      fontWeight: 'bold',
    },
    h4: {
      fontSize: 34,
      fontWeight: 'bold',
      letterSpacing: 0.25,
    },
    h5: {
      fontSize: 24,
      fontWeight: 'bold',
      letterSpacing: 1.5,
    },
    h6: {
      fontSize: 22,
      fontWeight: '500',
      letterSpacing: 0.15,
    },
    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
    wt100: {
      fontWeight: '100',
    },
    wt200: {
      fontWeight: '200',
    },
    wt300: {
      fontWeight: '300',
    },
    wt400: {
      fontWeight: '400',
    },
    wt500: {
      fontWeight: '500',
    },
    wt600: {
      fontWeight: '600',
    },
    wt700: {
      fontWeight: '700',
    },
    wt800: {
      fontWeight: '800',
    },
    wt900: {
      fontWeight: '900',
    },
    wtNormal: {
      fontWeight: 'normal',
    },
    wtBold: {
      fontWeight: 'bold',
    },
    sz1: {
      fontSize: figmaDimenToRN( 1 ),
    },
    sz2: {
      fontSize: figmaDimenToRN( 2 ),
    },
    sz3: {
      fontSize: figmaDimenToRN( 3 ),
    },
    sz4: {
      fontSize: figmaDimenToRN( 4 ),
    },
    sz5: {
      fontSize: figmaDimenToRN( 5 ),
    },
    sz6: {
      fontSize: figmaDimenToRN( 6 ),
    },
    sz7: {
      fontSize: figmaDimenToRN( 7 ),
    },
    sz8: {
      fontSize: figmaDimenToRN( 8 ),
    },
    sz9: {
      fontSize: figmaDimenToRN( 9 ),
    },
    sz10: {
      fontSize: figmaDimenToRN( 10 ),
    },
    sz11: {
      fontSize: figmaDimenToRN( 11 ),
    },
    sz12: {
      fontSize: figmaDimenToRN( 12 ),
    },
    sz13: {
      fontSize: figmaDimenToRN( 13 ),
    },
    sz14: {
      fontSize: figmaDimenToRN( 14 ),
    },
    sz15: {
      fontSize: figmaDimenToRN( 15 ),
    },
    sz16: {
      fontSize: figmaDimenToRN( 16 ),
    },
    sz17: {
      fontSize: figmaDimenToRN( 17 ),
    },
    sz18: {
      fontSize: figmaDimenToRN( 18 ),
    },
    sz19: {
      fontSize: figmaDimenToRN( 19 ),
    },
    sz20: {
      fontSize: figmaDimenToRN( 20 ),
    },
    sz21: {
      fontSize: figmaDimenToRN( 21 ),
    },
    sz22: {
      fontSize: figmaDimenToRN( 22 ),
    },
    sz23: {
      fontSize: figmaDimenToRN( 23 ),
    },
    sz24: {
      fontSize: figmaDimenToRN( 24 ),
    },
    sz25: {
      fontSize: figmaDimenToRN( 25 ),
    },
    sz26: {
      fontSize: figmaDimenToRN( 26 ),
    },
    sz27: {
      fontSize: figmaDimenToRN( 27 ),
    },
    sz28: {
      fontSize: figmaDimenToRN( 28 ),
    },
    sz29: {
      fontSize: figmaDimenToRN( 29 ),
    },
    sz30: {
      fontSize: figmaDimenToRN( 30 ),
    },
    sz31: {
      fontSize: figmaDimenToRN( 31 ),
    },
    sz32: {
      fontSize: figmaDimenToRN( 32 ),
    },
    sz33: {
      fontSize: figmaDimenToRN( 33 ),
    },
    sz34: {
      fontSize: figmaDimenToRN( 34 ),
    },
    sz35: {
      fontSize: figmaDimenToRN( 35 ),
    },
    sz36: {
      fontSize: figmaDimenToRN( 36 ),
    },
    sz37: {
      fontSize: figmaDimenToRN( 37 ),
    },
    sz38: {
      fontSize: figmaDimenToRN( 38 ),
    },
    sz39: {
      fontSize: figmaDimenToRN( 39 ),
    },
    sz40: {
      fontSize: figmaDimenToRN( 40 ),
    },
    sz41: {
      fontSize: figmaDimenToRN( 41 ),
    },
    sz42: {
      fontSize: figmaDimenToRN( 42 ),
    },
    sz43: {
      fontSize: figmaDimenToRN( 43 ),
    },
    sz44: {
      fontSize: figmaDimenToRN( 44 ),
    },
    sz45: {
      fontSize: figmaDimenToRN( 45 ),
    },
    sz46: {
      fontSize: figmaDimenToRN( 46 ),
    },
    sz47: {
      fontSize: figmaDimenToRN( 47 ),
    },
    sz48: {
      fontSize: figmaDimenToRN( 48 ),
    },
    sz49: {
      fontSize: figmaDimenToRN( 49 ),
    },
    sz50: {
      fontSize: figmaDimenToRN( 50 ),
    },
    sz51: {
      fontSize: figmaDimenToRN( 51 ),
    },
    sz52: {
      fontSize: figmaDimenToRN( 52 ),
    },
    sz53: {
      fontSize: figmaDimenToRN( 53 ),
    },
    sz54: {
      fontSize: figmaDimenToRN( 54 ),
    },
    sz55: {
      fontSize: figmaDimenToRN( 55 ),
    },
    sz56: {
      fontSize: figmaDimenToRN( 56 ),
    },
    sz57: {
      fontSize: figmaDimenToRN( 57 ),
    },
    sz58: {
      fontSize: figmaDimenToRN( 58 ),
    },
    sz59: {
      fontSize: figmaDimenToRN( 59 ),
    },
    sz60: {
      fontSize: figmaDimenToRN( 60 ),
    },
    sz61: {
      fontSize: figmaDimenToRN( 61 ),
    },
    sz62: {
      fontSize: figmaDimenToRN( 62 ),
    },
    sz63: {
      fontSize: figmaDimenToRN( 63 ),
    },
    sz64: {
      fontSize: figmaDimenToRN( 64 ),
    },
  } );
}
