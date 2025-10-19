import { createBrowserRouter, Outlet, Link, redirect } from "react-router-dom";
import { UsersList } from "../modules/users/users-list";
import { Counter } from "../modules/counters/counters";
import { UserInfo } from "../modules/users/user-info";
import { fetchUsers } from "../modules/users/model/fetch-users";
// import { fetchUser } from "../modules/users/model/fetch-user";
import { store } from "./store";
import { usersSlice } from "../modules/users/users.slice";

// const loadStore = () => new Promise((resolve) => {
//     setTimeout(() => resolve(store), 0);
// }); /* (при использовании store в router между ними может возникнуть циклическая зависимость, поэтому немного откладываем получение store) */

/* (импользование thunk(позволяет передавать функции в dispatch) позволяет делать запросы для получения состояний redux не из компонента(из useEffect после построения страницы), а из роутера, паралельно переходам со страницы на страницу) */
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
                loader: () => {
                    // loadStore().then(() => store.dispatch(fetchUsers())); 
                    // store.dispatch(fetchUsers({}))
                    return null;
                }
            },
            {
                path: "users/:id",
                element: <UserInfo />,
                loader: ({params}) => {
                    // loadStore().then(() => store.dispatch(fetchUser(params.id ?? "")));
                    // store.dispatch(fetchUser(params.id ?? ""))
                    // store.dispatch(usersSlice.actions.fetchUser({userId: params.id ?? ""}))
                    return null;
                }
            },
            {
                path: "counters",
                element: <Counter counterId="third"/>,
            }
        ]
    },
])