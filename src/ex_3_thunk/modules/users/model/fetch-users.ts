import type { /* AppDispatch, AppState, */ AppThunk } from "../../../store";
import { usersSlice } from "../users.slice";

/* (переделываем функцию для изменения state соответственно этапам запроса - добавляем миддлвер thunk, который позволяет передавать функцию(эту) в dispatch и добавляет некоторый функционал - в д.с прокмдывает dispatch и getState и добавляет экстраАргумент - в д.с обьект с api(настраиваем в store)) */
export const fetchUsers = (): AppThunk => 
    (dispatch, getState, {api})=> {
    const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState());
    if (!isIdle) return;
    dispatch(usersSlice.actions.fetchUsersPending());
    api.getUsers()
    .then(users => {
        dispatch(usersSlice.actions.fetchUsersSuccess({users}))
    })
    .catch(() => dispatch(usersSlice.actions.fetchUsersFailed()))
}
// export const fetchUsers = (dispatch: AppDispatch, getState: () => AppState) => {
//     const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState());
//     if (!isIdle) return;
//     dispatch(usersSlice.actions.fetchUsersPending());
//     api.getUsers()
//     .then(users => {
//         dispatch(usersSlice.actions.fetchUsersSuccess({users}))
//     })
//     .catch(() => dispatch(usersSlice.actions.fetchUsersFailed()))
// }