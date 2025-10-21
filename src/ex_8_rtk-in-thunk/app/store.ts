import { configureStore } from "@reduxjs/toolkit";
// import { usersSlice } from "../modules/users/users.slice";
import { countersReducer } from "../modules/counters/counters.slice";
import { /* api, */ baseApi } from "../shared/api";
import { router } from "./router";


const loadRouter = (): Promise<typeof router>  => new Promise((resolve) => {
    setTimeout(() => resolve(router), 0);
}); /* (при использовании store в router между ними может возникнуть циклическая зависимость, поэтому немного откладываем получение router - автор откладывал получение store в router, но у меня работает наоборот) */

export const extraArgument = { 
    // api, /* (при работе с rtk query api не передаем) */
    loadRouter, 
    // router
}

export const store = configureStore({  
    reducer: {
        counters: countersReducer,
        // [usersSlice.name]: usersSlice.reducer,
        [baseApi.reducerPath]: baseApi.reducer, /* (подключаем редьюсер rtk query - используем для работы с состояниями извне, с БД например) */
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({thunk: {extraArgument}}).concat(
            baseApi.middleware /* (добавляем миддлвер к базовым) */
        ),
});