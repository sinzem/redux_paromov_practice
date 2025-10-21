import type {  AppThunk } from "../../../shared/redux";
import { usersApi } from "../api";
import { type UserId } from "../users.slice";

export const deleteUser = (userId: UserId): AppThunk<Promise<void>> => 
    async (dispatch, _, {loadRouter}) => { 

        await dispatch(usersApi.endpoints.deleteUser.initiate(userId));
        await loadRouter().then((router) => router.navigate("/users"));
       
        await dispatch(usersApi.util.invalidateTags([{type: "Users", id: "LIST"}]));
}
