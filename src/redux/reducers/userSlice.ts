import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../types.d';

const initialState: IUser = {
  name: 'user',
  surname: 'surname',
  email: 'email',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
