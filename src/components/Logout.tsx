import {Navigate} from "react-router-dom";
import apiClient from "../http-common";

export default function Logout() {

    let loggedin = JSON.parse(localStorage.getItem('AUTHORIZED') || 'false');

    if (loggedin) {
        const token = localStorage.getItem('access-token') || '';
        apiClient.get('auth/logout', {
            headers: {
                'Authorization': token
            }
        }).then(() => {
            localStorage.clear();
            window.location.reload()
        }).catch(error => {
            if (error.response.status === 401) {
                localStorage.clear();
                window.location.reload();
            }
        });
    }

    return <Navigate to="/login"/>
}

