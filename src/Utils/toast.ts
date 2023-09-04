import {
  Alert,
  Platform,
  ToastAndroid,
} from 'react-native';

const toast = ( msg: string, long = false, alert = false ) => {
  console.log( 'toast', msg );
  if( Platform.OS === 'android' ) {
    ToastAndroid.show( msg, long ? ToastAndroid.LONG : ToastAndroid.SHORT );
  } else if( alert ) {
    Alert.alert( '', msg );
  }
};

export {
  toast,
};
