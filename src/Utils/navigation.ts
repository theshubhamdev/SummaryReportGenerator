import { Linking } from 'react-native';

const openURL = async ( url: string | undefined ) => {
  if( !url ) {
    return;
  }
  if( await Linking.canOpenURL( url ) ) {
    await Linking.openURL( url );
  }
};

export {
  openURL,
};
