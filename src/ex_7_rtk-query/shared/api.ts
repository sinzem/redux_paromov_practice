import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"; 

const baseUrl = "http://localhost:3000";

export const baseApi = createApi({ /* (создаем базу для запросов, в д.с передали только базовый url, можно добавить headers и т.д, регистрируем в store, используем в модулях для создания более конкретных эндпоинтов) */
    baseQuery: fetchBaseQuery({baseUrl}),
    tagTypes: ["Users"], /* (теги - ключи, по которым будут храниться или обновляться данные) */
    endpoints: () => ({}), /* (обязательная общая функция, в д.с эндпоинты оставляем пустыми, логику запросов выносим на уровень модулей) */
})
