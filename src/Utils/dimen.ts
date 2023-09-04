import { Dimensions, PixelRatio, Platform } from 'react-native';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get( 'window' );

// based on the figma frame size
const scale = SCREEN_WIDTH / 300;
const scaleX = SCREEN_WIDTH / 360;
const scaleY = SCREEN_HEIGHT / 800;

const normalize = ( size: number ): number => {
  const newSize: number = size * scale;
  if( Platform.OS === 'ios' ) {
    return Math.round( PixelRatio.roundToNearestPixel( newSize ) );
  } else {
    return Math.round( PixelRatio.roundToNearestPixel( newSize ) - 2 );
  }
};

const normalizeX = ( size: number ): number => {
  const newSize: number = size * scaleX;
  if( Platform.OS === 'ios' ) {
    return Math.round( PixelRatio.roundToNearestPixel( newSize ) );
  } else {
    return Math.round( PixelRatio.roundToNearestPixel( newSize ) - 2 );
  }
};

const normalizeY = ( size: number ): number => {
  const newSize: number = size * scaleY;
  if( Platform.OS === 'ios' ) {
    return Math.round( PixelRatio.roundToNearestPixel( newSize ) );
  } else {
    return Math.round( PixelRatio.roundToNearestPixel( newSize ) - 2 );
  }
};

export {
  normalize,
  normalizeX,
  normalizeY,
};
