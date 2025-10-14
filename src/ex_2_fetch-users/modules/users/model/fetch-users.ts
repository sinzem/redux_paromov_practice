import { api } from "../../../shared/api";
import type { AppDispatch, AppState } from "../../../store";
import { usersSlice } from "../users.slice";

/* (логика изменения состояний соответственно состоянию запроса вынесена из компонента в отдельную функцию - теперь можно использовать в любом месте приложения, диспетчер и store можно получать и здесь, но могут быть баги, поэтому передаем снаружи пир вызове функции) */
export const fetchUsers = (dispatch: AppDispatch, getState: () => AppState) => {
    const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState());
    if (!isIdle) return;
    dispatch(usersSlice.actions.fetchUsersPending());
    api.getUsers()
    .then(users => {
        dispatch(usersSlice.actions.fetchUsersSuccess({users}))
    })
    .catch(() => dispatch(usersSlice.actions.fetchUsersFailed()))
}