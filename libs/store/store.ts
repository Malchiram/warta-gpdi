import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import ministryReducer from '@/libs/redux/ministryroster'
import scrollReducer from '@/libs/redux/scroll'
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["ministry"], // Hanya menyimpan state `user`
};

const rootReducer = combineReducers({
  ministry: ministryReducer,
  scroll: scrollReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REGISTER"], // Mengabaikan error serializable
      },
    }),
});
export type RootState = ReturnType<typeof rootReducer>;
export const persistor = persistStore(store);
