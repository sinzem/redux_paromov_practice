import { createAppAsyncThunk, /* type AppThunk  */} from "../../../shared/redux";
import { usersSlice } from "../users.slice";

// export const fetchUsers = ({refetch}: {refetch?: boolean} = {}): AppThunk => 
//     async (dispatch, getState, {api}) => {
//     const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState());
//     if (!isIdle && !refetch) return;
//     dispatch(usersSlice.actions.fetchUsersPending());
//     return api.getUsers()
//         .then(users => {
//             dispatch(usersSlice.actions.fetchUsersSuccess({users}))
//         })
//         .catch(() => dispatch(usersSlice.actions.fetchUsersFailed()))
// }

/* (создаем thunk с помощью createAsyncThunk - заменит код выше, оформляем в слайсе в extrareducers) */
export const fetchUsers = createAppAsyncThunk(
    "users/fetchUsers", /* (название для action) */
    /* (thunkAPI - обьект createAsyncThunk(со store, dispatch и т.д), типизированный в redux.ts) */
    async (params: {refetch?: boolean} = {}, thunkAPI) => {
        console.log(params);
        return thunkAPI.extra.api.getUsers();
    }, /* (запрос) */
    {  /* (необязательный обьект с опциями) */
        condition(params, {getState}) { /* (condition - условие для отработки запроса, должно вернуть true\false) */
            const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState());

            if (!params?.refetch && !isIdle) return false;

            return true;
        },
    },
 
)
