import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {useDispatch} from 'react-redux';
import {selectCurrentUserUUID, addPost} from "../store/storeSlice";
import ProfileButton from "../profileButton/ProfileButton";
import {IPost} from "../store/IPost";

function NewPost() {
    const dispatch = useDispatch();
    const currentUserUUID = useSelector(selectCurrentUserUUID);
    const [text, setText] = useState('');

    if (!currentUserUUID) {
        return <Redirect to='/'/>
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={text}
                    onChange={event => setText(event.target.value)}
                />
                <button
                    onClick={
                        () => {
                            const post: IPost = {
                                author: String(currentUserUUID),
                                text: text,
                                liked: [],
                                timeStamp: Date.now()
                            }
                            dispatch(addPost(post));
                        }
                    }
                >
                    Опубликовать
                </button>
            </div>
            <ProfileButton userUUID={currentUserUUID}/>
        </div>
    )
}

export default NewPost;
