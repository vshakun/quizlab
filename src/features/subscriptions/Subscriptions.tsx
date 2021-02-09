import {useParams} from "react-router-dom";
import React from "react";
import {PeopleList} from "../peopleList/PeopleList";
import {useSelector} from "react-redux";
import {selectUsers} from "../auth/authSlice";

export function Subscriptions() {
    const {profileUUID} = useParams();
    const users = useSelector(selectUsers);
    const userSubscriptions = users[profileUUID].subscriptions;

    return (
        <PeopleList list={userSubscriptions} profile={profileUUID} />
    )
}