import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import storage from 'redux-persist/lib/storage'; 
import {persistReducer, persistStore} from 'redux-persist';

const rootReducer = combineReducers({
    user: userReducer,
});

const presistConfig = {
    key: 'root',
    storage,
    version: 1,
};

const persistedReducer = persistReducer(presistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})

export const persistor = persistStore(store);