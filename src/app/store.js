import { combineReducers, configureStore } from '@reduxjs/toolkit'
import loginUserReducer from "../features/userAuth/authSlice"
import gameReducer from "../features/game/gameSlice"

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer = combineReducers({ 
  user:loginUserReducer ,
  game: gameReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})


export const persistor = persistStore(store)