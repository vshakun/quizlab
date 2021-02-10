import {Link} from "react-router-dom";
import React from "react";

function ProfileFooter() {
    return (
        <div>
            <div>
                <Link to={"/feed"}>В ленту</Link>
            </div>
            <div>
                <Link to={"/newPost"}>Добавить пост</Link>
            </div>
        </div>
    )
}

export default ProfileFooter;
