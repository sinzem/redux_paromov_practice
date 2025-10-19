import { memo, useMemo, useState } from "react";
// import { 
    // useAppSelector,
// } from "../../shared/redux";
import { 
    type User, 
    // type UserId, 
    // usersSlice, 
} from "./users.slice";
import { useNavigate } from "react-router-dom";
import { usersApi } from "./api";

export function UsersList() {
    const [sortType, setSortType] = useState<"asc" | "desc">("asc");

    const { data: users, isLoading } = usersApi.useGetUsersQuery(); /* (получаем данные и состояние запроса из rtk query) */

    // const isPending = useAppSelector(usersSlice.selectors.selectIsFetchUsersPending);
  
    // const sortedUsers = useAppSelector((state) =>
    //     usersSlice.selectors.selectSortedUsers(state, sortType)
    // );

    const sortedUsers = useMemo(() => {
        return [...(users ?? [])].sort((a, b) => {
            if (sortType === "asc") {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        })
    }, [users, sortType]);

    if (/* isPending */ isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col items-center">
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
                            // userId={user.id}
                            user={user}
                            key={user.id}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

const UserListItem = memo(function UserListItem({
    // userId
    user
}: {
    // userId: UserId
    user: User
}) {
    const navigate = useNavigate();
    // const user = useAppSelector(state => state.users.entities[userId])
    const handleUserClick = () => {
        navigate(user.id, {relative: "path"})
    };

    if (!user) return null;

    return (
        <li key={user.id} className="py-2" onClick={handleUserClick}>
            <span className="hover:underline cursor-pointer">{user.name}</span>
        </li>
    )
})

