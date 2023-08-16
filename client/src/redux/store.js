import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './authSlice';
import userReduer from './userSlice'
import postReducer from './postSlice'
import commentReducer from './commentSlice'

const rootReducer = combineReducers({
    auth:authReducer,
    user:userReduer,
    post:postReducer,
    comment:commentReducer
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist:['auth', 'user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)  

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

export let persistor = persistStore(store)
export default store