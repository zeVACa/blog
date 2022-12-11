import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types.d';

const initialState: IUser = {
  username: null,
  email: null,
  token: null,
  image: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<IUser>) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.token = action.payload.token;
    },
    logout(state) {
      state.username = null;
      state.email = null;
      state.image = null;
      state.token = null;
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
