import React, { Component } from 'react';
import Navbar from "./navbar";
import Produksi from "./produksi";

class produksiPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Produksi />
            </div>
        );
    }
}

export default produksiPage;