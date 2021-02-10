import {Link} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import {selectUsers} from "../store/storeSlice";

function ProfileHeader(props: any) {
    const users = useSelector(selectUsers);
    const profileUUID = props.profileUUID;

    const userSubscribersCount = Object.entries(users).reduce((count, [_, user]) => {
        return user.subscriptions.includes(profileUUID) ? count + 1 : count;
    }, 0);

    return (
        <p>
            {users[profileUUID].name},
            <Link to={`/subscriptions/${profileUUID}`}>{users[profileUUID].subscriptions.length} подписок</Link>,
            <Link to={`/subscribers/${profileUUID}`}>{userSubscribersCount} подписчиков</Link>
        </p>
    )
}

export default ProfileHeader;
