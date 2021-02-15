import React, { Component } from 'react';
import Navbar from "./navbar";
import StockReconciliation from "./stockReconciliation";

class stockReconciliationPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <StockReconciliation />
            </div>
        );
    }
}

export default stockReconciliationPage;