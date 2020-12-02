import React, { Component } from 'react';
import Navbar from "./navbar";
import Pembelian from "./pembelian";

class pembelianPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Pembelian />
            </div>
        );
    }
}

export default pembelianPage;