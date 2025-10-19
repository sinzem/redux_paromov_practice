// import { z } from "zod";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"; /* (подключаем createApi, именно из query для реакта) */

const baseUrl = "http://localhost:3000";

export const baseApi = createApi({ /* (создаем базу для запросов, в д.с передали только базовый url, можно добавить headers и т.д, регистрируем в store, используем в модулях для создания более конкретных эндпоинтов) */
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: () => ({}), /* (обязательная общая функция, в д.с эндпоинты оставляем пустыми, логику запросов выносим на уровень модулей) */
})

// const UserDtoSchema = z.object({
//     id: z.string(),
//     name: z.string(),
//     description: z.string(),
// })

// export const api = {
//     getUsers: async () => {
//         return await fetch(`${baseUrl}/users`)
//             .then((response) => response.json())
//             .then((res) => {
//                 return UserDtoSchema.array().parse(res); 
//             });
//     },

//     getUser: async (userId: string) => {
//         return await fetch(`${baseUrl}/users/${userId}`)
//             .then((response) => response.json())
//             .then((res) => UserDtoSchema.parse(res));
//     },

//     deleteUser: async (userId: string) => {
//         return await fetch(`${baseUrl}/users/${userId}`, {
//             method: "DELETE",
//         }).then((response) => response.json());
//     }
// }