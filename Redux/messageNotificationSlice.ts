import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessageNotification {
  id: string;
  message: string;
  email: string;
}

const localStorageKey = 'messageNotifications';

// Load initial state from localStorage
const loadState = (): MessageNotification[] => {
  if (typeof window !== 'undefined') {
    const storedState = localStorage.getItem(localStorageKey);
    return storedState ? JSON.parse(storedState) : [];
  }
  return [];
};

const initialState: MessageNotification[] = loadState();

const messageNotificationSlice = createSlice({
  name: 'messageNotification',
  initialState,
  reducers: {
    setMessageNotification: (state, action: PayloadAction<MessageNotification>) => {
      // Add new notification with a unique id
      state.push(action.payload);
      // Update localStorage with the new state
      localStorage.setItem(localStorageKey, JSON.stringify(state));
    },
    clearMessageNotification: (state) => {
      state.length = 0;  // Clear all notifications
      localStorage.removeItem(localStorageKey);
    },
    removeMessageNotificationByEmail: (state, action: PayloadAction<string>) => {
      const filteredState = state.filter((notif) => notif.email !== action.payload);
      localStorage.setItem(localStorageKey, JSON.stringify(filteredState));
      return filteredState;
    },
    removeMessageNotificationById: (state, action: PayloadAction<string>) => {
      const filteredState = state.filter((notif) => notif.id !== action.payload);
      localStorage.setItem(localStorageKey, JSON.stringify(filteredState));
      return filteredState;
    },
  },
});

export const { setMessageNotification, clearMessageNotification, removeMessageNotificationByEmail, removeMessageNotificationById } = messageNotificationSlice.actions;
export default messageNotificationSlice.reducer;
