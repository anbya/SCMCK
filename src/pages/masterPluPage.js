import React, { Component } from 'react';
import Navbar from "./navbar";
import MasterPlu from "./masterPlu";

class masterPluPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <MasterPlu />
            </div>
        );
    }
}

export default masterPluPage;