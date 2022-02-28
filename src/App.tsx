import React, {Component} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import apiClient from "./http-common";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Transactions from './components/Transactions';
import Categories from './components/Categories';
import Report from './components/Report';


class App extends Component<any, any> {

    render () {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="/transactions" element={<Transactions/>}/>
                    <Route path="/categories" element={<Categories/>}/>
                    <Route path="/report" element={<Report/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;
