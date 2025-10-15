import type {  AppThunk } from "../../../store";
import { usersSlice, type UserId } from "../users.slice";
import { fetchUsers } from "./fetch-users";

export const deleteUser = (userId: UserId): AppThunk<Promise<void>> => 
    async (dispatch, _, {api}) => {
    dispatch(usersSlice.actions.deleteUserPending());
    try {
        await api.deleteUser(userId);
        dispatch(usersSlice.actions.deleteUserSuccess({userId}));

        dispatch(fetchUsers({refetch: true}))
    } catch {
        dispatch(usersSlice.actions.fetchUserFailed())
    }
}
