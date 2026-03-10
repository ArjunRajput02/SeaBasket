import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  sessionToken: string | null;
}

const initialState: AuthState = {
  token: null,
  sessionToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state: AuthState, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setSessionToken(state: AuthState, action: PayloadAction<string>) {
      state.sessionToken = action.payload;
    },
    clearToken(state: AuthState) {
      state.token = null;
      state.sessionToken = null;
    },
  },
});

export const { setToken, setSessionToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
