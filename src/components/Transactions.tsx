import React, {Component} from "react";
// import apiClient from "../http-common";
import {Navigate} from "react-router-dom"
import Navbar from "./Navbar";

export default class Transactions extends Component<any, any> {

    state = {
        loggedin: JSON.parse(localStorage.getItem('AUTHORIZED') || 'false')
    }

    render() {
        if (!this.state.loggedin) {
            return <Navigate to="/login"/>
        }

        return (
            <div>
                <Navbar/>
                <h1>transactions</h1>
            </div>
        );
    }
}

