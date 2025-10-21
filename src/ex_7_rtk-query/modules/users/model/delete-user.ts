// import type {  AppThunk } from "../../../shared/redux";
// import { usersSlice, type UserId } from "../users.slice";
// import { fetchUsers } from "./fetch-users";

// export const deleteUser = (userId: UserId): AppThunk<Promise<void>> => 
//     async (dispatch, _, {api, router}) => { /* (передаем роутер - при удалении пользователя нужно редиректнуть на userslist) */
//     dispatch(usersSlice.actions.deleteUserPending());
//     try {
//         await api.deleteUser(userId);
//         await router.navigate("/users"); /* (при успешном удалении пользователя самое оптимальное место для редиректа - не нужно ждать полного завершения и редиректить из useEffect) */
//         await dispatch(fetchUsers({refetch: true}));
//         dispatch(usersSlice.actions.deleteUserSuccess({userId}));
//     } catch {
//         dispatch(usersSlice.actions.deleteUserFailed())
//     }
// }
