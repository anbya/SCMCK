import React, { Component } from 'react';
import Navbar from "./navbar";
import Outlet from "./masterOutlet";

class masterOutletPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Outlet />
            </div>
        );
    }
}

export default masterOutletPage;