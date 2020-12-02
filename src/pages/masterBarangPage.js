import React, { Component } from 'react';
import Navbar from "./navbar";
import Barang from "./masterBarang";

class masterBarangPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Barang />
            </div>
        );
    }
}

export default masterBarangPage;