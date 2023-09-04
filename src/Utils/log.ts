import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

const logStep = async ( msg: string, params?: { [key: string]: any } ) => {
  // format msg to snake_case.
  const msgFormatted = msg.toLowerCase().replace( /\s+/g, '_' ).replace( /[^a-zA-Z0-9_]/g, '' );
  console.log( msg, params );
  crashlytics().log( msg );
  await analytics().logEvent( msgFormatted.substring( 0, 40 ), params );
};

const logDebugStep = ( msg: string ) => {
  console.log( msg );
  crashlytics().log( msg );
};

const trace = ( tracePrefix: string, ...args: any[] ) => {
  const stringifiedLog = args.reduce( ( prevLog, currLog ) => {
    let logStr = '';
    try {
      logStr = JSON.stringify( currLog );
    } catch( err ) {
      // pass
    } finally {
      return logStr ? `${prevLog}\t${logStr}` : prevLog;
    }
  }, '' );
  console.log( tracePrefix, JSON.stringify( args ) );
  crashlytics().log( `T_${tracePrefix}: ${stringifiedLog}` );
};

const traceStoreReducer = ( ...msg: any[] ) => {
  trace( 'STORE_REDUCER', msg );
};

const traceEffect = ( ...msg: any[] ) => {
  trace( 'EFFECT', msg );
};

const traceCallback = ( ...msg: any[] ) => {
  trace( 'CALLBACK', msg );
};

const traceMemo = ( ...msg: any[] ) => {
  trace( 'MEMO', msg );
};

const traceState = ( ...msg: any[] ) => {
  trace( 'STATE', msg );
};

const traceGQL = ( ...msg: any[] ) => {
  trace( 'GQL', msg );
};

const traceStoreAction = ( ...msg: any[] ) => {
  trace( 'STORE_ACTION', msg );
};

const traceStoreSelector = ( ...msg: any[] ) => {
  trace( 'STORE_SELECTOR', msg );
};

const traceUtil = ( ...msg: any[] ) => {
  trace( 'UTIL', msg );
};

const traceTheme = ( ...msg: any[] ) => {
  trace( 'THEME', msg );
};

const traceNavigation = ( ...msg: any[] ) => {
  trace( 'NAVIGATION', msg );
};

const traceHook = ( ...msg: any[] ) => {
  trace( 'HOOK', msg );
};

const traceContainer = ( ...msg: any[] ) => {
  trace( 'CONTAINER', msg );
};

const logErrorStep = ( err: Error | unknown, jsErrorName?: string ) => {
  if( err && typeof err === 'object' && err.hasOwnProperty( 'message' ) ) {
    const msg = ( err as Error ).message;
    console.log( msg );
    crashlytics().log( msg );
  } else {
    recordError( err, jsErrorName );
  }
};

const recordError = ( err: Error | unknown, jsErrorName?: string ): void => {
  console.log( 'recordError', err, jsErrorName );
  if( err && typeof err === 'object' && err.hasOwnProperty( 'name' ) ) {
    crashlytics().recordError( err as Error, jsErrorName );
  } else {
    crashlytics().recordError( new Error( 'UNKNOWN_ERROR' ), jsErrorName );
  }
};

export {
  logStep,
  logDebugStep,
  logErrorStep,
  recordError,
  traceStoreReducer,
  traceEffect,
  traceCallback,
  traceMemo,
  traceState,
  traceGQL,
  traceStoreAction,
  traceStoreSelector,
  traceUtil,
  traceTheme,
  traceNavigation,
  traceHook,
  traceContainer,
};
