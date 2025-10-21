import type {  AppThunk } from "../../../shared/redux";
import { usersApi } from "../api";
import { type UserId } from "../users.slice";

/* (пример использования rtk в thunk - rtk позволяет сильно упростить работу с состоянием, но не позволяет так тонко контролировать, как thunk - для примера при удалении в thunk обновляем состояние и отправляем пользователя на usersList, rtk не позволяет так использовать router, только из компонента) */
export const deleteUser = (userId: UserId): AppThunk<Promise<void>> => 
    async (dispatch, _, {loadRouter/* router */}) => { 
        // const user = await dispatch(usersApi.endpoints.getUser.initiate(userId, {subscribe: false})).unwrap(); /* (пример получения данных в Thunk) */

        await dispatch(usersApi.endpoints.deleteUser.initiate(userId/* , {track: false} */)); /* (track: false отменит запись о мутации в state, в д.с не нужно, так как нужно отследить isLoading для disabled кнопки удаления) */
        await loadRouter().then((router) => router.navigate("/users"));
        // await router.navigate("/users");
        await dispatch(usersApi.util.invalidateTags([{type: "Users", id: "LIST"}]));

        /* (пример обновления нужного состояния вручную с помощью updateQueryData, например для optimisticUpdate) */
        // await dispatch(
        //     usersApi.util.updateQueryData("getUser", userId, () => {
        //         return undefined
        //     })
        // )
}
