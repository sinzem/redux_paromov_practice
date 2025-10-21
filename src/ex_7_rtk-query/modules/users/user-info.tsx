import { useNavigate, useParams } from "react-router-dom";
import { type UserId } from "./users.slice";
import { usersApi } from "./api";
import { skipToken } from "@reduxjs/toolkit/query";

export function UserInfo() {

    const navigate = useNavigate();
    const {id} = useParams<{id: UserId}>();

    /* (получаем из rtk данные пользователя и состояние запроса) */
    const {data: user, isLoading: isLoadingUser} = usersApi.useGetUserQuery(id ?? skipToken); /* (на случай отсутствия id передаем skipToken - запрос будет проигнорирован) */

    /* (при работе с мутациями получаем массив, где первой будет функция вызова мутации(навешиваем на кнопку), а вторым - обьект состояния) */
    const [deleteUser, {isLoading: isLoadingDelete}] = usersApi.useDeleteUserMutation();

    const handleBackButtonClick = () => {
        navigate("..", {relative: "path"}); 
    };

    const handleDeleteButtonClick = async () => {
        if (!id) return;
        await deleteUser(id);
        navigate("..", {relative: "path"});
     }

    if (isLoadingUser || !user) return <div>Loading...</div>;

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleBackButtonClick}
                className="btn"
            >
                Back
            </button>
            <h2 className="text-3xl">{user.name}</h2>
            <p className="text-xl">{user.description}</p>
            <button
                onClick={handleDeleteButtonClick}
                className="btn bg-red-500"
                disabled={isLoadingDelete}
            >
                Delete
            </button>
        </div>
    )
}