import { createSlice } from '@reduxjs/toolkit';

export const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contacts: []
  },
  reducers: {
    // Adds a contact record from the store
    add: (state, contact) => {
      contact.payload.currentItem.id = state.contacts.length;
      state.contacts.push(contact.payload.currentItem);
    },
    
    // Removes a contact record from the store
    remove: (state, contact) => {
      const listIndex = state.contacts.findIndex((contactRecord) => {
        return contactRecord.id === contact.payload.id;
      });

      state.contacts.splice(listIndex, 1);
    },

    // Edits a specific store record
    edit: (state, contact) => {
      const listIndex = state.contacts.findIndex((contactRecord) => {
        return contactRecord.id === contact.payload.id;
      });

      state.contacts[listIndex] = contact.payload;
    }
  },
});

// Gets the entire contact list from the store
export const contactsList = state => state.contact.contacts;

// export all of the reducers out as actions
export const { add, remove, edit } = contactSlice.actions;

export default contactSlice.reducer;
