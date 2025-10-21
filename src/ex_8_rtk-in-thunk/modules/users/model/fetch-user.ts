// import type {  AppThunk } from "../../../shared/redux";
// import { usersSlice, type UserId } from "../users.slice";

/* (при работе с asyncThunkCreator этот функционал прописывается прямо в слайсе в редьюсерах) */
// export const fetchUser = (userId: UserId): AppThunk => 
//     (dispatch, getState, {api})=> {
//     // const isPending = usersSlice.selectors.selectIsFetchUserPending(getState());
//     // if (!isPending) return;
//     dispatch(usersSlice.actions.fetchUserPending());
//     api.getUser(userId)
//     .then(user => {
//         dispatch(usersSlice.actions.fetchUserSuccess({user}))
//     })
//     .catch(() => dispatch(usersSlice.actions.fetchUserFailed()))
// }
