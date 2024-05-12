import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { token_storage } from "../storage";

interface ThemeState {
  theme: string | null;
}

const initialState: ThemeState = {
  theme: null,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.theme;

export const toggleColorScheme =
  (colorScheme: string) => async (dispatch: any) => {
    try {
      await dispatch(setTheme(colorScheme));
      token_storage.set("theme", colorScheme);
    } catch (error) {
      console.log(error);
    }
  };

export default themeSlice.reducer;
