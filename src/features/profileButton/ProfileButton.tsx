import {Link} from "react-router-dom";
import React from "react";

function ProfileButton (props: any) {
    return (
        <div>
            <button>
                <Link to={`/profile/${props.userUUID}`}>В профиль</Link>
            </button>
        </div>
    )
}

export default ProfileButton;
