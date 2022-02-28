import * as React from "react";
import {Link, useMatch, useResolvedPath, Navigate} from "react-router-dom";
import type {LinkProps} from "react-router-dom";

export default function Navbar() {

    let credentials = JSON.parse(localStorage.getItem('credentials') || '');
    let loggedin = JSON.parse(localStorage.getItem('AUTHORIZED') || 'false')

    if (!loggedin) {
        return <Navigate to="/login"/>
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <CustomLink to="/transactions" className={"nav-link"}>İşlemler</CustomLink>
                        <CustomLink to="/categories" className={"nav-link"}>Kategoriler</CustomLink>
                        <CustomLink to="/report" className={"nav-link"}>Rapor</CustomLink>
                    </ul>
                </div>
                <div className="navbar-collapse collapse w-100 order-2 dual-collapse2">
                    <ul className="navbar-nav ml-auto">
                        <span className="navbar-text">
                            {credentials.firstname} {credentials.lastname},
                        </span>
                        <CustomLink to="/logout" className={"nav-link"}>Çıkış</CustomLink>
                    </ul>
                </div>
            </nav>
        </div>
    );

}

function CustomLink({children, to, ...props}: LinkProps) {
    let resolved = useResolvedPath(to);
    let match = useMatch({path: resolved.pathname, end: true});
    return (
        <li className={match ? "nav-item active" : "nav-item"}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    );
}

