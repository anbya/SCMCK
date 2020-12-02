import React, { Component } from 'react';
import Navbar from "./navbar";
import RawProsessingPlan from "./rawProsessingPlan";

class rawProsessingPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <RawProsessingPlan />
            </div>
        );
    }
}

export default rawProsessingPage;