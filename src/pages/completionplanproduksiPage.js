import React, { Component } from 'react';
import Navbar from "./navbar";
import Completionplanproduksi from "./completionplanproduksi";

class completionplanProduksiPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Completionplanproduksi />
            </div>
        );
    }
}

export default completionplanProduksiPage;