import { useNavigate, useParams } from "react-router-dom";
import { usersSlice, type UserId } from "./users.slice";
import { useAppDispatch, useAppSelector } from "../../shared/redux";
// import { deleteUser } from "./model/delete-user";

export function UserInfo() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {id = ""} = useParams<{id: UserId}>();
    const isPending = useAppSelector(
        usersSlice.selectors.selectIsFetchUserPending
    );
    const isDeletePending = useAppSelector(
        usersSlice.selectors.selectIsDeleteUserPending
    );
    const user = useAppSelector(state => 
        usersSlice.selectors.selectUserById(state, id)
    );


    const handleBackButtonClick = () => {
        navigate("..", {relative: "path"}); 
    };

    const handleDeleteButtonClick = () => {
        dispatch(/* deleteUser(id) */usersSlice.actions.deleteUser({userId: id}))
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
                disabled={isDeletePending}
            >
                Delete
            </button>
        </div>
    )
}