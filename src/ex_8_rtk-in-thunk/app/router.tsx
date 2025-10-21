import { createBrowserRouter, Outlet, Link, redirect } from "react-router-dom";
import { UsersList } from "../modules/users/users-list";
import { Counter } from "../modules/counters/counters";
import { UserInfo } from "../modules/users/user-info";
import { usersApi } from "../modules/users/api";
import { store } from "./store";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div className="container p-5 flex flex-col gap-5">
                <header className="py-5 flex gap-4">
                    <Link to="users">Users</Link>
                    <Link to="counters">Counters</Link>
                </header>
                <Outlet />
            </div>
        ),
        children: [
            {
                index: true,
                loader: () => redirect("/users"),
            },
            {
                path: "users",
                element: <UsersList />,
                loader: async () => {
                    // usersApi.endpoints.getUsers.select()(store.getState()); /* (можем вызывать Api из роутера, например в д.с вызываем и получаем состояние, но так делать не рекомендуется - стараемся не использовать select для get - будет постоянно перерисовывать, при мутации - нет) */ 
                    // const result = await store.dispatch(usersApi.endpoints.getUsers.initiate()).unwrap(); /* (инициализируем данные - если они есть - вернет их, если нет - выполнит запрос, если нужны эти данные, получаем их таким образом, а не так как в примере выше) */
                    store.dispatch(usersApi.util.prefetch("getUsers", undefined, {})); /* (для предзапроса лучше использовать prefetch(в любом месте приложения), передаем в него метод, обьект с аргументами(undefined в д.с) и обьект с настройками, например force-запрос, или использовать предыдущие данные, в д.с оставляем по умолчанию) */ 
                    return null;
                }
            },
            {
                path: "users/:id",
                element: <UserInfo />,
                loader: ({params}) => {
                    store.dispatch(usersApi.util.prefetch("getUser", params.id ?? '', {}));
                    return null;
                }
            },
            {
                path: "counters",
                element: <Counter counterId="third"/>,
            }
        ]
    },
]);

export type RouterType = typeof router;
