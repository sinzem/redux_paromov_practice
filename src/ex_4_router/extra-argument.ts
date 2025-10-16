import { api } from "./shared/api";
import { router } from "./router";

/* (выносим экстрааргумент(аргумент для thunk - middleware для redux, позволяющий передавать функции в dispatch) из store в отдельный документ чтобы избежать циклической зависимости) */
export const extraArgument = { 
    api, /* (для запросов) */
    router, /* (для работы с роутами, например, при удалении user можно сделать редирект сразу из функции, а не дожидаться ее выполнения в useEffect) */
}