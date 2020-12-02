import React, { Component } from 'react';
import Navbar from "./navbar";
import Planproduksi from "./planproduksi";

class planProduksiPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Planproduksi />
            </div>
        );
    }
}

export default planProduksiPage;