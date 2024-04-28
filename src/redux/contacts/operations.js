import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../auth/operations";

// Оголошення операцій:

// fetchContacts - одержання масиву контактів (метод GET) запитом. Базовий тип екшену це рядок "contacts/fetchAll".
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkApi) => {
    try {
      const { data } = await instance.get("/contacts");
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
// addContact - додавання нового контакту (метод POST). Базовий тип екшену це рядок "contacts/addContact".

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (addContactForm, thunkApi) => {
    try {
      const { data } = await instance.post("/contacts", addContactForm);
      return data;
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
      const { data } = await instance.delete(`/contacts/${contactId}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
