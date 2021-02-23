import React, { Component } from 'react';
import Navbar from "./navbar";
import Waste from "./waste";

class wastePage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Waste />
            </div>
        );
    }
}

export default wastePage;