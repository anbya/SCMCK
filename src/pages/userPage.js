import React, { Component } from 'react';
import Navbar from "./navbar";
import User from "./user";

class userPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <User />
            </div>
        );
    }
}

export default userPage;