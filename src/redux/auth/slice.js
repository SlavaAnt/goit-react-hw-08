import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { register, login, refreshUser, logout } from "../auth/operations";

// const handlePending = (state) => {
//   state.loading = true;
//   state.error = false;
// };

// const handleRejected = (state) => {
//   state.loading = false;
//   //   state.error = action.payload;
//   state.error = true;
// };

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    // isRefreshing: false,
    loading: false,
    error: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })

      .addCase(refreshUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.error = false;
      })

      .addMatcher(
        isAnyOf(
          register.pending,
          login.pending,
          refreshUser.pending,
          logout.pending
        ),
        (state) => {
          state.loading = true;
          state.error = false;
        }
      )
      .addMatcher(
        isAnyOf(
          register.rejected,
          login.rejected,
          refreshUser.rejected,
          logout.rejected
        ),
        (state) => {
          state.loading = false;
          //   state.error = action.payload;
          state.error = true;
        }
      );
  },
});

export const authReducer = authSlice.reducer;

// Carl Carlson
// CarlCarlson@mail.com
// Carl Carlson

// Slava A
// slava@mail.com
// 123456789

// slava 100
// slava100@mail.com
// slava100
