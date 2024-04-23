import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://6624fce604457d4aaf9d81d2.mockapi.io";

// Оголошення операцій:

// fetchContacts - одержання масиву контактів (метод GET) запитом. Базовий тип екшену це рядок "contacts/fetchAll".
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/contacts");
      return response.data; // те що повертається потрапляє в action.payload
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
// addContact - додавання нового контакту (метод POST). Базовий тип екшену це рядок "contacts/addContact".

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (item, thunkApi) => {
    try {
      const response = await axios.post("/contacts", item);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// ---------------------------------------
// deleteContact - видалення контакту по ID (метод DELETE). Базовий тип екшену це рядок "contacts/deleteContact".

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkApi) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
