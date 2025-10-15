import { configureStore, createSelector, type ThunkAction, type UnknownAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { usersSlice } from "./modules/users/users.slice";
import { countersReducer } from "./modules/counters/counters.slice";
import { api } from "./shared/api";

const extraArgument = { /* (экстрааргумент для thunk) */
    api,
}

export const store = configureStore({  
    reducer: {
        counters: countersReducer,
        [usersSlice.name]: usersSlice.reducer,
    },

    middleware: (getDefaultMiddleware) => /* (в toolkit уже есть встроенный набор миддлверов, их можно получить и донастроить, в д.с донастраиваем thunk - миддлвер, позволяющий передавать в store функции - добавит экстрааргумент, который пойдет в эту функцию) */
        getDefaultMiddleware({thunk: {extraArgument}}),
});

export type AppState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction< /* (типизация thunk - из документации) */
    R,
    AppState,
    typeof extraArgument,
    UnknownAction
>;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();