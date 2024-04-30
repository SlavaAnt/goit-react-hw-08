import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// axios.defaults.baseURL - тільки для запиту на один URL чи одного  бекенду
// axios.defaults.baseURL = "https://connections-api.herokuapp.com";

// const instance = axios.create - для багатьох url
export const instance = axios.create({
  baseURL: "https://connections-api.herokuapp.com",
});

export const setAuthHeader = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = "";
};

// Оголошення операцій:

// register - реєстрація нового користувача (метод POST). Базовий тип екшену це рядок "auth/register".Використовується у компоненті RegistrationForm на сторінці реєстрації.
export const register = createAsyncThunk(
  "auth/register",
  async (registerFormData, thunkApi) => {
    try {
      const { data } = await instance.post("/users/signup", registerFormData); // (endpoint (з документації), дані)
      setAuthHeader(data.token);
      return data; // те що повертається потрапляє в action.payload
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
// Операція Thunk діспачить (dispatch(action)) три типи action:
//   - dispatch(action.pending);
//   - dispatch(action.fullfilled);
//   - dispatch(action.rejected);

// ---------------------------------------
// login - логін існуючого користувача (метод POST). для логіну існуючого користувача. Базовий тип екшену "auth/login". Використовується у компоненті LoginForm на сторінці логіну.
export const login = createAsyncThunk(
  "auth/login",
  async (loginFormData, thunkApi) => {
    try {
      const { data } = await instance.post("/users/login", loginFormData);
      setAuthHeader(data.token);
      return data; // те що повертається потрапляє в action.payload
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// ---------------------------------------
// logout - для виходу з додатка (метод POST). Базовий тип екшену "auth/logout". Використовується у компоненті UserMenu у шапці додатку.
export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    await instance.post("/users/logout");
    clearAuthHeader();
    return;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

// ---------------------------------------
// refreshUser - оновлення користувача за токеном (метод GET). Базовий тип екшену "auth/refresh". Використовується у компоненті App під час його монтування.
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth.token;

    if (token === null) {
      // If there is no token, exit without performing any request
      return thunkApi.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(token);
      const { data } = await instance.get("/users/current");
      return data; // те що повертається потрапляє в action.payload
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
