import { z } from "zod";
import { baseApi } from "../../shared/api";
import type { User, UserId } from "./users.slice";

const UserDtoSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
})
/* (вместо слайса создаем эндпоинты, инжектируем в основной - по сути создается обьект, для хранения и изменения данных из эндпоинтов, возвращает или сами данные, или состояние запроса - соответственно, используется для работы с внешними источниками данных, БД например, в качестве кеша) */
export const usersApi = baseApi.injectEndpoints({
    endpoints: (create) => ({ /* (принимает встроенный обьект(create или любое другое название) с методами создания эндпоинтов - query, mutation и infiniteQuery) */
        /* (данные из этого обьекта получаем в любом компоненте, обращаясь к обьекту и эндпоинту - например usersApi.useGetUsersQuery() - название метода генерируется из use+ИмяЭндпоинта+Метод, возвращает или сами данные запроса, или текущее состояние запроса) */
        getUsers: create.query<User[], void>({ /* (создаем эндпоинт, типизируем в формате <возвращаемое значение(User[]), передаваемый аргумент(void)>)) */
            // query: () => ({url: "/users", headers: {}}) /* (можно передавать обьектом или просто строкой) */
            query: () => "/users",
            // providesTags: ["Users", {type: "Users", id: "LIST"}],
            providesTags: ["Users"],
            transformResponse: (res: unknown) => UserDtoSchema.array().parse(res), /* (transformResponse - поле для валидации ответа) */
        }),
        getUser: create.query<User, UserId>({ /* (типизируем в формате <возвращаемое значение(User[]), передаваемый аргумент(UserId)>)) */
            query: (userId) => `/users/${userId}`,
            // providesTags: (_, __, userId) => ["Users", {type: "Users", id: userId}], /* (можно прописывать функцию, аргументы - data из query, Error из query, параметры из query) */
            providesTags: ["Users"],
            transformResponse: (res: unknown) => UserDtoSchema.parse(res),
        }),
        deleteUser: create.mutation<void, UserId>({ 
            /* (пример мутирующего запроса и обьекта запроса - можем также передать метод, тело и еще кучу возможных полей) */
            query: (userId) => ({
                method: "DELETE",
                url: `users/${userId}`,
                // body: {}
            }),
            // invalidatesTags: (_, __, userId) => [ /* (после удаления инвалидируем store по двум ключам) */
            //     {type: "Users", id: "LIST"},
            //     {type: "Users", id: userId}
            // ],
            invalidatesTags: ["Users"], /* (в д.с более прстым будет сохранять и инвалидировать все по одному более общему ключу - в некоторых случаях вызовет лишние запросы, но так проще и надежнее, инвалидация происходит по активной ссылке - в д.с users/id, usersList будет перезапрошен при переходе на его страницу) */
        }),
    }),
    overrideExisting: true, /* (флаг для отображения изменений в коде без перезагрузки страницы) */
})

// export const {useGetUsersQuery} = usersApi; /* (можно сразу экспортировать отдельные эндпоинты - генерирует название как use+ИмяЭндпоинта+Метод) */