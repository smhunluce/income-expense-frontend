import React, {Component} from "react";
import apiClient from "../http-common";
import {Navigate} from "react-router-dom"
import Navbar from "./Navbar";

export default class AddCategories extends Component<any, any> {

    state = {
        loggedin: JSON.parse(localStorage.getItem('AUTHORIZED') || 'false')
    }

    render() {
        if (!this.state.loggedin) {
            return <Navigate to="/login"/>
        }
        const formContainerStyle = {
            border: "1px solid #c1bfbf",
            borderRadius: "15px"
        };
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="my-4">Kategoriler</h3>
                            <div className="p-4 bg-light" style={formContainerStyle}>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="name">Kategory</label>
                                        <input type="name" className="form-control" id="name" />
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="type"
                                               id="type1" value="income"/>
                                        <label className="form-check-label" htmlFor="type1">Gelir</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="type"
                                               id="type2" value="expense"/>
                                        <label className="form-check-label" htmlFor="type2">Gider</label>
                                    </div>
                                    <div className="mt-3">
                                        <button type="submit" className="btn btn-primary">Kaydet</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

