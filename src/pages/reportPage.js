import React, { Component } from 'react';
import Navbar from "./navbar";
import Report from "./report";

class reportPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Report />
            </div>
        );
    }
}

export default reportPage;