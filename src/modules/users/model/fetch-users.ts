import type { AppThunk } from "../../../app/store";
import { usersSlice } from "../users.slice";

/* (добавили refetch, понадобится при удалении пользователя) */
export const fetchUsers = ({refetch}: {refetch?: boolean} = {}): AppThunk => 
    async (dispatch, getState, {api}) => {
    const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState());
    if (!isIdle && !refetch) return;
    dispatch(usersSlice.actions.fetchUsersPending());
    return api.getUsers()
        .then(users => {
            dispatch(usersSlice.actions.fetchUsersSuccess({users}))
        })
        .catch(() => dispatch(usersSlice.actions.fetchUsersFailed()))
}
