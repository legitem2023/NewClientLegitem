import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessageNotificationState { message: string; email: string; }

const localStorageKey = 'messageNotification';

// Load initial state from localStorage const loadState = (): MessageNotificationState => { if (typeof window !== 'undefined') { const storedState = localStorage.getItem(localStorageKey); return storedState ? JSON.parse(storedState) : { message: '', email: '' }; } return { message: '', email: '' }; };

const initialState: MessageNotificationState = loadState();

const messageNotificationSlice = createSlice({ 
  name: 'messageNotification', 
  initialState, 
  reducers: { 
    setMessageNotification: ( state, action: PayloadAction<{ message: string; email: string }> ) => { 
       state.message = action.payload.message; 
       state.email = action.payload.email; 
       localStorage.setItem(localStorageKey, JSON.stringify(state)); }, 
    clearMessageNotification: (state) => { 
       state.message = ''; 
       state.email = ''; 
       localStorage.removeItem(localStorageKey); 
    }, 
  }, 
});

export const { setMessageNotification, clearMessageNotification } = messageNotificationSlice.actions; export default messageNotificationSlice.reducer;

