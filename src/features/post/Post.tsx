import React from "react";

export interface IPost {
    author: string,
    text: string,
    liked: Array<string>
}

export function Post(props: any) {
    return (
        <div>
            <p>{props.post.author}</p>
            <p>{props.post.text}</p>
            <p>Liked: {props.post.liked.join(', ')}</p>
        </div>
    )
}
