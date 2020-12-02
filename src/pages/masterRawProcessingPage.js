import React, { Component } from 'react';
import Navbar from "./navbar";
import MasterRawProcessing from "./masterRawProcessing";

class masterRawProcessingPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <MasterRawProcessing />
            </div>
        );
    }
}

export default masterRawProcessingPage;