import { PayloadAction } from '@reduxjs/toolkit';
import { BaseStoreModule } from '@/store/base/BaseStoreModule';

type AuthState = User.AuthState;

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
};

export class AuthStore extends BaseStoreModule<AuthState> {
  constructor() {
    super('auth', initialState);
  }

  protected createReducers() {
    return {
      setAccessToken: (state: AuthState, action: PayloadAction<string>) => {
        state.accessToken = action.payload;
      },

      setRefreshToken: (state: AuthState, action: PayloadAction<string>) => {
        state.refreshToken = action.payload;
      },

      clearTokens: (state: AuthState) => {
        state.accessToken = null;
        state.refreshToken = null;
      },

      patchAuth: this.createPatchReducer(),
    };
  }

  override get selectors() {
    return {
      getAccessToken: (state: { auth: AuthState }) => state.auth.accessToken,
      isAuthenticated: (state: { auth: AuthState }) =>
        !!state.auth.accessToken && !!state.auth.refreshToken,
    };
  }
}
