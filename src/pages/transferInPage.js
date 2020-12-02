import React, { Component } from 'react';
import Navbar from "./navbar";
import BetweenTransferIn from "./betweenTransferIn";

class transferInPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <BetweenTransferIn />
            </div>
        );
    }
}

export default transferInPage;