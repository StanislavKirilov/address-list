import { configureStore } from '@reduxjs/toolkit';
import contactReducer from '../features/contacts/contactSlice';

export default configureStore({
  reducer: {
    contact: contactReducer,
  },
});
