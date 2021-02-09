import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUsers} from "../auth/authSlice";

export function PeopleList(props: any) {
    const list = props.list;
    const profileUUID = props.profile;
    const users = useSelector(selectUsers);
    const componentList = list.map((uuid: string) => <Link to={`/profile/${uuid}`}>{users[uuid].name}</Link>);

    return (
        <div>
            <Link to={`/profile/${profileUUID}`}><button>Назад</button></Link>
            <div>
                {componentList}
            </div>
        </div>
    )
}
