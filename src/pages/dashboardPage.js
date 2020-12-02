import React, { Component } from 'react';
import Navbar from "./navbar";
import Main from "./main";

class dashboardPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Main />
            </div>
        );
    }
}

export default dashboardPage;