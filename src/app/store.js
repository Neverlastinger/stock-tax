import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import root from './rootReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, root);

const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);
// persistor.purge();
export default store;
