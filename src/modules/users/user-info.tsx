import { useNavigate, useParams } from "react-router-dom";
import { usersSlice, type UserId } from "./users.slice";
import { useAppDispatch, useAppSelector } from "../../store";
import { useEffect } from "react";
import { fetchUser } from "./model/fetch-user";
import { deleteUser } from "./model/delete-user";

export function UserInfo() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {id = ""} = useParams<{id: UserId}>();
    const isPending = useAppSelector(
        usersSlice.selectors.selectIsFetchUserPending
    );
    const user = useAppSelector(state => 
        usersSlice.selectors.selectUserById(state, id)
    );

    useEffect(() => {
        dispatch(fetchUser(id));
    }, [dispatch, id]);

    const handleBackButtonClick = () => {
        navigate("..", {relative: "path"}); /* (навигация на .. назад) */
    };

    const handleDeleteButtonClick = () => {
        dispatch(deleteUser(id))
            .then(() => navigate("..", {relative: "path"}));
    }

    if (isPending || !user) return <div>Loading...</div>;

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
            >
                Delete
            </button>
        </div>
    )
}