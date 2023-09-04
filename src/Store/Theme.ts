import { createSlice } from '@reduxjs/toolkit';

import { traceStoreReducer } from '@/Utils';

const initialState: ThemeState = {
  theme: null,
  darkMode: null,
};

const themeSlice = createSlice( {
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: ( state, { payload: { theme, darkMode } }: ThemePayload ) => {
      traceStoreReducer( 'theme.changeTheme' );
      if( typeof theme !== 'undefined' ) {
        state.theme = theme;
      }
      if( typeof darkMode !== 'undefined' ) {
        state.darkMode = darkMode;
      }
    },
    setDefaultTheme: (
      state,
      { payload: { theme, darkMode } }: ThemePayload,
    ) => {
      traceStoreReducer( 'theme.setDefaultTheme' );
      if( !state.theme ) {
        state.theme = theme;
        state.darkMode = darkMode;
      }
    },
    reset: ( state ) => {
      traceStoreReducer( 'theme.reset' );
      Object.assign( state, initialState );
    },
  },
} );

export const { changeTheme, setDefaultTheme, reset } = themeSlice.actions;

export default themeSlice.reducer;

export type ThemeState = {
  theme: 'default' | null | undefined,
  darkMode: boolean | null | undefined,
}

type ThemePayload = {
  payload: {
    theme: 'default' | null | undefined,
    darkMode: boolean | null | undefined,
  },
}
