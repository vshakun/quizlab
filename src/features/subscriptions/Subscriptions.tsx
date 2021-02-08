import React from "react";
import {Link} from "react-router-dom";

export function Subscriptions() {
    const subscriptions = ['User1', 'User2']

    let subscriptionList: Array<any> = [];
    subscriptions.forEach((item, index) => {
        subscriptionList.push(<p>{item}</p>)
    })

    return (
        <div>
            <Link to={"/profile"}>Назад</Link>
            <ul>
                {subscriptionList}
            </ul>
        </div>
    )
}
