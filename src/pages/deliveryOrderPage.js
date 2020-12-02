import React, { Component } from 'react';
import Navbar from "./navbar";
import DeliveryOrder from "./productout";

class deliveryOrderPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <DeliveryOrder />
            </div>
        );
    }
}

export default deliveryOrderPage;