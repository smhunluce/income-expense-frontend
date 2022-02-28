import './login-register.css';
import React, {Component, createRef} from "react";
import apiClient from "../http-common";
import {Link, Navigate} from "react-router-dom"
import CONSTANTS from "../variables";

export default class Login extends Component<any, any> {
    private login: any;
    private password: any;
    private loginFeedback: any;
    private passwordFeedback: any;
    private failedLogin: any;

    constructor(props) {
        super(props);
        this.login = createRef();
        this.loginFeedback = createRef();
        this.password = createRef();
        this.passwordFeedback = createRef();
        this.failedLogin = createRef();
    }

    state = {
        email_phone: '',
        password: '',
        remember_me: true,
        loggedin: CONSTANTS.AUTHORIZED
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleChecked = event => {
        this.setState({
            [event.target.name]: event.target.checked ? 'on' : ''
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        this.login.current.classList.remove('is-invalid');
        this.loginFeedback.current.innerHTML = '';
        this.password.current.classList.remove('is-invalid');
        this.passwordFeedback.current.innerHTML = '';
        this.failedLogin.current.classList.add('d-none');


        apiClient.post('auth/login', {
            email_phone: this.state.email_phone,
            password: this.state.password,
            remember_me: this.state.remember_me,
        })
            .then(res => {
                localStorage.setItem('access-token', res.data.token_type + " " + res.data.access_token);
                localStorage.setItem('credentials', JSON.stringify(res.data.user));
                localStorage.setItem('AUTHORIZED', JSON.stringify(true));
                CONSTANTS.AUTHORIZED = true;
                this.setState({loggedin: true})
            })
            .catch(error => {
                if (error.response.status === 400) {
                    for (let field in error.response.data.error) {
                        let messages = error.response.data.error[field];
                        if (field === 'email' || field === 'phone_number') {
                            this.login.current.classList.add('is-invalid');
                            this.loginFeedback.current.innerHTML = messages.join('<br/>');
                        } else {
                            this.password.current.classList.add('is-invalid');
                            this.passwordFeedback.current.innerHTML = messages.join('<br/>');
                        }
                    }
                    CONSTANTS.AUTHORIZED = false;
                } else if (error.response.status === 401) {
                    this.failedLogin.current.classList.remove('d-none');
                    CONSTANTS.AUTHORIZED = false;
                }
            });
    }

    render() {
        if (this.state.loggedin) {
            return <Navigate to="/transactions"/>
        }
        return (
            <div className="form-auth">
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <h3 className="text-center mt-n5 mb-4">Giriş</h3>

                        <label htmlFor="email_phone" className="sr-only">Telefon / Email</label>
                        <input type="text" name="email_phone" id="email_phone" className="form-control mt-3"
                               placeholder="Telefon / Email" autoFocus onChange={this.handleChange}
                               ref={this.login}/>
                        <div ref={this.loginFeedback} className="invalid-feedback"/>

                        <label htmlFor="password" className="sr-only">Şifre</label>
                        <input type="password" name="password" id="password" className="form-control mt-3"
                               placeholder="Şifre" onChange={this.handleChange}
                               ref={this.password}/>
                        <div ref={this.passwordFeedback} className="invalid-feedback"/>

                        <div className="checkbox my-3">
                            <label>
                                <input type="checkbox" name="remember_me" id="inputRememberMe"
                                       onChange={this.handleChecked} defaultChecked={this.state.remember_me}/> Beni
                                Hatırla
                            </label>
                        </div>

                        <button className="btn btn-lg btn-primary btn-block">Giriş</button>
                        <div className="alert alert-danger mt-3 d-none" ref={this.failedLogin}>
                            Giriş Başarısız.
                            <br/>
                            Bilgilerinizi kontol edip tekrar deneyin.
                        </div>
                        <div className="mt-3">
                            Henüz bir hesabın yok mu? <Link to="/register">Kaydol</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

