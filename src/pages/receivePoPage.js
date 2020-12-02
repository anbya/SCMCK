import React, { Component } from 'react';
import Navbar from "./navbar";
import ReceivePo from "./receivepo";

class receivePoPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <ReceivePo />
            </div>
        );
    }
}

export default receivePoPage;