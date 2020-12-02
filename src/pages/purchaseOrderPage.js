import React, { Component } from 'react';
import Navbar from "./navbar";
import PurchaseOrder from "./productin";

class purchaseOrderPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <PurchaseOrder />
            </div>
        );
    }
}

export default purchaseOrderPage;