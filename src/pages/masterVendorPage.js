import React, { Component } from 'react';
import Navbar from "./navbar";
import Vendor from "./masterVendor";

class masterVendorPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Vendor />
            </div>
        );
    }
}

export default masterVendorPage;