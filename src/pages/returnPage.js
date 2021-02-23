import React, { Component } from 'react';
import Navbar from "./navbar";
import Return from "./return";

class returnPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Return />
            </div>
        );
    }
}

export default returnPage;