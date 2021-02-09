import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {Auth} from "./features/auth/Auth";
import {Feed} from "./features/feed/Feed";
import {Profile} from "./features/profile/Profile";
import {NewPost} from './features/newPost/NewPost';
import {Subscriptions} from "./features/subscriptions/Subscriptions";
import {Subscribers} from "./features/subscribers/Subscribers";

export function Router() {
    return (
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Auth}/>
                <Route path="/feed" component={Feed}/>
                <Route path="/profile/:profileUUID" component={Profile}/>
                <Route path="/newPost" component={NewPost} />
                <Route path="/subscriptions/:profileUUID" component={Subscriptions} />
                <Route path="/subscribers/:profileUUID" component={Subscribers} />
            </div>
        </BrowserRouter>
    );
}
