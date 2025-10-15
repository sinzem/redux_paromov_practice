import type { AppThunk } from "../../../store";
import { usersSlice } from "../users.slice";

export const fetchUsers = ({refetch}: {refetch?: boolean} = {}): AppThunk => 
    (dispatch, getState, {api})=> {
    const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState());
    if (!isIdle && !refetch) return;
    dispatch(usersSlice.actions.fetchUsersPending());
    api.getUsers()
    .then(users => {
        dispatch(usersSlice.actions.fetchUsersSuccess({users}))
    })
    .catch(() => dispatch(usersSlice.actions.fetchUsersFailed()))
}
