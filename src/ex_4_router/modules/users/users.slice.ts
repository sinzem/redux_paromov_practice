import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
    fetchUserStatus: "idle" | "pending" | "success" | "failed";
    deleteUserStatus: "idle" | "pending" | "success" | "failed"; 
}

const initialUsersState: UsersState = {
    entities: {},
    ids: [],
    fetchUsersStatus: "idle",
    fetchUserStatus: "idle",
    deleteUserStatus: "idle",
};

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
    reducers: { 
        fetchUsersPending: (state) => {
            state.fetchUsersStatus = "pending";
        },
        fetchUsersSuccess: (state, action: PayloadAction<{users: User[]}>) => {
            const {users} = action.payload;
            state.fetchUsersStatus = "success";
            state.entities = users.reduce((acc, user) => {
                acc[user.id] = user;
                return acc;
            }, {} as Record<UserId, User>);
            state.ids = users.map(user => user.id);
        }, 
        fetchUsersFailed: (state) => {
            state.fetchUsersStatus = "failed";
        },
        fetchUserPending: (state) => {
            state.fetchUserStatus = "pending";
        },
        fetchUserSuccess: (state, action: PayloadAction<{user: User}>) => {
            const {user} = action.payload;
            state.fetchUserStatus = "success";
            state.entities[user.id] = user;
        },
        fetchUserFailed: (state) => {
            state.fetchUserStatus = "failed";
        },
        deleteUserSuccess: (state, action: PayloadAction<{userId: UserId}>) => {
            state.deleteUserStatus = "success";

            delete state.entities[action.payload.userId];
            state.ids = state.ids.filter(id => id !== action.payload.userId);
        },
        deleteUserPending: (state) => {
            state.fetchUserStatus = "pending";
        },
        deleteUserFailed: (state) => {
            state.fetchUserStatus = "failed";
        },
    }
})
