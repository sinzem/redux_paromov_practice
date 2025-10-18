import { createAppAsyncThunk, /* type AppThunk  */} from "../../../shared/redux";
import { usersSlice } from "../users.slice";

export const fetchUsers = createAppAsyncThunk(
    "users/fetchUsers", 
    async (params: {refetch?: boolean} = {}, thunkAPI) => {
        console.log(params);
        return thunkAPI.extra.api.getUsers();
    }, 
    {  
        condition(params, {getState}) {
            const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState());

            if (!params?.refetch && !isIdle) return false;

            return true;
        },
    },
 
)
