import { memo, useEffect, useState } from "react";
import { 
    useAppDispatch, 
    useAppSelector,
    useAppStore, 
} from "../../store";
import { 
    type User, 
    type UserId, 
    usersSlice, 
} from "./users.slice";
// import { api } from "../../shared/api";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./model/fetch-users";

export function UsersList() {
    const dispatch = useDispatch();
    const appStore = useAppStore(); 
    const [sortType, setSortType] = useState<"asc" | "desc">("asc");

    const isPending = useAppSelector(usersSlice.selectors.selectIsFetchUsersPending);

    useEffect(() => {
        /* (логику изменения состояний во время запроса вынесли в отдельную функцию) */
        fetchUsers(appStore.dispatch, appStore.getState);
    }, [dispatch, appStore]);
  
    const sortedUsers = useAppSelector((state) =>
        usersSlice.selectors.selectSortedUsers(state, sortType)
    );

    const selectedUser = useAppSelector(usersSlice.selectors.selectSelectedUserId);

    if (isPending) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col items-center">
            {!selectedUser ? (
                <div className="flex flex-col items-center justify-between">
                    <div className="flex flex-row items-center gap-5">
                        <button
                            onClick={() => setSortType("asc")}
                            className="btn"
                        >
                            Asc
                        </button>
                          <button
                            onClick={() => setSortType("desc")}
                            className="btn"
                        >
                            Desc
                        </button>
                    </div>
                    <ul className="list-none">
                        {sortedUsers.map((user: User) => (
                            <UserListItem 
                                userId={user.id}
                                key={user.id}
                            />
                        ))}
                    </ul>
                </div>
            ) : (
                <SelectedUser userId={selectedUser} />
            )}
        </div>
    )
}

const UserListItem = memo(function UserListItem({userId}: {userId: UserId}) {
    const user = useAppSelector(state => state.users.entities[userId])
    const dispatch = useAppDispatch();
     const handleUserClick = () => {
        dispatch(usersSlice.actions.selected({userId: user.id}))
    };

    return (
        <li key={user.id} className="py-2" onClick={handleUserClick}>
            <span className="hover:underline cursor-pointer">{user.name}</span>
        </li>
    )
})

function SelectedUser({userId}: {userId: UserId}) {
    const user = useAppSelector(state => state.users.entities[userId])
    const dispatch = useAppDispatch();

    const handleBackButtonClick = () => {
        dispatch(usersSlice.actions.selectRemove())
    };

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
        </div>
    )
}