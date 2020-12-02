import React, { Component } from 'react';
import Navbar from "./navbar";
import Order from "./order";

class orderPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Order />
            </div>
        );
    }
}

export default orderPage;