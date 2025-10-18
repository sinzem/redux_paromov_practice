import { createSelector/* , type PayloadAction  */} from "@reduxjs/toolkit";
import { fetchUsers } from "./model/fetch-users";
import { createSlice, type ExtraArgument } from "../../shared/redux";

export type UserId = string;

export type User = {
    id: UserId;
    name: string;
    description: string;
}

export type UsersState = {
    entities: Record<UserId, User | undefined>;
    ids: UserId[];
    fetchUsersStatus: "idle" | "pending" | "success" | "failed"; 
    fetchUserStatus:  "idle" | "pending" | "success" | "failed";
    deleteUserStatus: "idle" | "pending" | "success" | "failed"; 
}

const initialUsersState: UsersState = {
    entities: {},
    ids: [],
    fetchUsersStatus: "idle",
    fetchUserStatus:  "idle",
    deleteUserStatus: "idle",
};

/* (заменяем встроенный createSlice на дополненный asyncThunkCreator(в redux.ts)) */
export const usersSlice = createSlice({
    name: "users", 
    initialState: initialUsersState,  
    selectors: { 
        selectUserById: (state, userId: UserId) => state.entities[userId],
        selectSortedUsers: createSelector(
            (state: UsersState) => state.ids,
            (state: UsersState) => (state.entities),
            (_: UsersState, sort: "asc" | "desc") => sort,
            (ids, entities, sort) => 
                ids 
                    .map((id) => entities[id])
                    .filter((user): user is User => !!user) /* (фильтруем, так как user может быть undefined) */
                    .sort((a, b) => {
                        if (sort === "asc") {
                            return a.name.localeCompare(b.name);
                        } else {
                            return b.name.localeCompare(a.name)
                        }
                    }) 
        ),
        selectIsFetchUsersPending: (state) => state.fetchUsersStatus === "pending",
        selectIsFetchUsersIdle: (state) => state.fetchUsersStatus === "idle",
        selectIsFetchUserPending: (state) => state.fetchUserStatus === "pending",
        selectIsDeleteUserPending: (state) => state.deleteUserStatus === "pending",
    },
    /* (c asyncThunkCreator редьюсеры представляют функцию, которая возвращает обьект) */
    reducers: (creator) => ({ /* (передаем встроенный creator, с помощью которого создаем thunk) */
        /* (обьединяем action, thunk и редьюсер) */
        fetchUser: creator.asyncThunk< /* (ключ, по которому будет работать редьюсер) */
            User,
            {userId: UserId},
            {extra: ExtraArgument}
        >((params, thunkAPI) => {
            return thunkAPI.extra.api.getUser(params.userId); /* (запрос) */
        }, 
        {
            /* (обьект для работы с состояниями загрузки/успеха/ошибки, также можно передать другие необязательные поля(в документации)) */
            // options: {},
            pending: (state) => {
                state.fetchUserStatus = "pending";
            },
            fulfilled: (state, action) => {
                const user = action.payload;
                state.fetchUserStatus = "success";
                state.entities[user.id] = user;
            },
            rejected: (state) => {
                state.fetchUserStatus = "failed";
            },
        }
    ),
        // fetchUserPending: (state) => {
        //     state.fetchUserStatus = "pending";
        // },
        // fetchUserSuccess: (state, action: PayloadAction<{user: User}>) => {
        //     const {user} = action.payload;
        //     state.fetchUserStatus = "success";
        //     state.entities[user.id] = user;
        // },
        // fetchUserFailed: (state) => {
        //     state.fetchUserStatus = "failed";
        // },

        /* (обычные редьюсеры при работе с asyncThunkCreator тоже нужно создавать через creator) */
        // deleteUserSuccess: creator.reducer((state, action: PayloadAction<{userId: UserId}>) => {
        //     state.deleteUserStatus = "success";

        //     delete state.entities[action.payload.userId];
        //     state.ids = state.ids.filter(id => id !== action.payload.userId);
        // }),
        // deleteUserPending: creator.reducer((state) => {
        //     state.fetchUserStatus = "pending";
        // }),
        // deleteUserFailed: creator.reducer((state) => {
        //     state.fetchUserStatus = "failed";
        // }),
        deleteUser: creator.asyncThunk< 
            User,
            {userId: UserId},
            {extra: ExtraArgument}
        >((params, thunkAPI) => {
            return thunkAPI.extra.api.deleteUser(params.userId); 
        }, 
        {
            // options: {},
            pending: (state) => {
                state.deleteUserStatus = "pending";
            },
            fulfilled: (state, action) => {
                state.deleteUserStatus = "success";
                
                delete state.entities[action.payload.id];
                state.ids = state.ids.filter(id => id !== action.payload.id);
            },
            rejected: (state) => {
                state.deleteUserStatus = "failed";
            },
        }),
    }),
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.fetchUsersStatus = "pending";
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.fetchUsersStatus = "success";
            const users = action.payload;
            
            state.entities = users.reduce((acc, user) => {
                acc[user.id] = user;
                return acc;
            }, {} as Record<UserId, User>);
            state.ids = users.map((user) => user.id);
        });
        builder.addCase(fetchUsers.rejected, (state) => {
            state.fetchUsersStatus = "failed";
        })
    }
})
