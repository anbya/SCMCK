import React, { Component } from 'react';
import Navbar from "./navbar";
import BetweenTransferOut from "./betweenTransferOut";

class transferOutPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <BetweenTransferOut />
            </div>
        );
    }
}

export default transferOutPage;