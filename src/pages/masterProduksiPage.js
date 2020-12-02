import React, { Component } from 'react';
import Navbar from "./navbar";
import MasterProduksi from "./masterProduksi";

class masterProduksiPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <MasterProduksi />
            </div>
        );
    }
}

export default masterProduksiPage;