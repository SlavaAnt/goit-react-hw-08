import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

export const selectNameFilter = (state) => state.filters.name;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    if (filter.length > 0) {
      return contacts.filter(
        ({ name, number }) =>
          name.toLowerCase().includes(filter.trim().toLowerCase()) ||
          number.includes(filter.trim())
      );
    } else {
      return contacts;
    }
  }
);
