import { Dimensions, PixelRatio, Platform } from 'react-native';

const {
  width: SCREEN_WIDTH,
} = Dimensions.get( 'window' );

// based on the figma frame size
const scale = SCREEN_WIDTH / 300;

export default function( size: number ) {
  const newSize: number = size * scale;
  if( Platform.OS === 'ios' ) {
    return Math.round( PixelRatio.roundToNearestPixel( newSize ) );
  } else {
    return Math.round( PixelRatio.roundToNearestPixel( newSize ) - 2 );
  }
}
