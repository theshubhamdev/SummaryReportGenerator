import RandomUserAgent from 'random-useragent';
import { Linking, Platform } from 'react-native';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

import { recordError } from './log';

import { copyToClipboard } from '@/Utils/clipboard';
import { toast } from '@/Utils/toast';

const fs = RNFetchBlob.fs;

const convertAndShare = async ( imageUrl: string ): Promise<void> => {
  if( !imageUrl || imageUrl.length === 0 ) {
    return;
  }
  let imagePath: string | null = null;
  const resp = await RNFetchBlob.config( {
    fileCache: true,
  } ).fetch( 'GET', imageUrl, {
    'User-Agent': RandomUserAgent.getRandom(),
  } );

  imagePath = resp.path();
  let base64Data = await resp.readFile( 'base64' );
  let ext = '';
  switch( base64Data.charAt( 0 ) ) {
    case '/':
      ext = 'jpg';
      break;
    case 'i':
      ext = 'png';
      break;
    case 'R':
      ext = 'gif';
      break;
    case 'U':
      ext = 'webp';
      break;
    default:
      ext = '';
  }
  base64Data = `data:image/${ext};base64,` + base64Data;
  // here's base64 encoded image
  await Share.open( { url: base64Data } );
  // remove the file from storage
  fs.unlink( imagePath );
};

const canShareOnFacebook = async () => {
  if( Platform.OS === 'android' ) {
    return ( await Share.isPackageInstalled( 'com.facebook.android' ) ).isInstalled ||
    ( await Share.isPackageInstalled( 'com.example.facebook' ) ).isInstalled ||
    ( await Share.isPackageInstalled( 'com.facebook.katana' ) ).isInstalled ||
    ( await Share.isPackageInstalled( 'com.facebook.orca' ) ).isInstalled;
  } else {
    return Linking.canOpenURL( 'fb://' );
  }
};

const shareImage = async ( imageUrl: string ): Promise<void> => {
  try {
    await convertAndShare( imageUrl );
  } catch( err ) {
    recordError( err, 'shareImage' );
  }
};

const shareLocalImage = async ( imageUrl: string ) => {
  try {
    await Share.open( { url: imageUrl } );
  } catch( err ) {
    recordError( err, 'shareLocalImage' );
  }
};

const shareLocalImageOnFacebook = async ( imageUrl: string ) => {
  try {
    await Share.shareSingle( {
      url: imageUrl,
      social: Share.Social.FACEBOOK,
      type: 'image/png',
    } );
  } catch( err ) {
    recordError( err, 'shareLocalImageOnFacebook' );
  }
};

export {
  canShareOnFacebook,
  shareImage,
  shareLocalImage,
  shareLocalImageOnFacebook,
};
