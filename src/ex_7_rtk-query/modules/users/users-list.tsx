import { memo, useMemo, useState } from "react";
import { type User } from "./users.slice";
import { useNavigate } from "react-router-dom";
import { usersApi } from "./api";

export function UsersList() {
    const [sortType, setSortType] = useState<"asc" | "desc">("asc");

    const { data: users, isLoading } = usersApi.useGetUsersQuery(); /* (получаем данные и состояние запроса из rtk query) */


    const sortedUsers = useMemo(() => {
        return [...(users ?? [])].sort((a, b) => {
            if (sortType === "asc") {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        })
    }, [users, sortType]);

    if (isLoading) {
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
    user
}: {
    user: User
}) {
    const navigate = useNavigate();
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

