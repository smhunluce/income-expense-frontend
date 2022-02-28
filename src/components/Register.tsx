import './login-register.css';
import React, {Component, createRef} from "react";
import apiClient from "../http-common";
import {Link, Navigate} from "react-router-dom"
import CONSTANTS from "../variables";

export default class Register extends Component<any, any> {
    private firstname: any;
    private lastname: any;
    private email: any;
    private phone_number: any;
    private password: any;
    private firstnameFeedback: any;
    private lastnameFeedback: any;
    private emailFeedback: any;
    private phone_numberFeedback: any;
    private passwordFeedback: any;

    constructor(props) {
        super(props);
        this.firstname = createRef();
        this.firstnameFeedback = createRef();
        this.lastname = createRef();
        this.lastnameFeedback = createRef();
        this.email = createRef();
        this.emailFeedback = createRef();
        this.phone_number = createRef();
        this.phone_numberFeedback = createRef();
        this.password = createRef();
        this.passwordFeedback = createRef();
    }

    state = {
        firstname: '',
        lastname: '',
        email: '',
        phone_number: '',
        password: '',
        loggedin: CONSTANTS.AUTHORIZED,
        registered: false
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        this.firstname.current.classList.remove('is-invalid');
        this.firstnameFeedback.current.innerHTML = '';
        this.lastname.current.classList.remove('is-invalid');
        this.lastnameFeedback.current.innerHTML = '';
        this.email.current.classList.remove('is-invalid');
        this.emailFeedback.current.innerHTML = '';
        this.phone_number.current.classList.remove('is-invalid');
        this.phone_numberFeedback.current.innerHTML = '';
        this.password.current.classList.remove('is-invalid');
        this.passwordFeedback.current.innerHTML = '';


        apiClient.post('auth/register', {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            phone_number: this.state.phone_number,
            password: this.state.password,
        })
            .then(() => {
                this.setState({registered: true})
            })
            .catch(error => {
                if (error.response.status === 400) {
                    for (let field in error.response.data.error) {
                        let messages = error.response.data.error[field];
                        this[field].current.classList.add('is-invalid');
                        this[field + 'Feedback'].current.innerHTML = messages.join('<br/>');
                    }
                }
            });
    }

    render() {
        if (this.state.loggedin) {
            return <Navigate to="/transactions"/>
        }
        if (this.state.registered) {
            return <Navigate to="/login"/>
        }
        return (
            <div className="form-auth">
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <h3 className="text-center mt-n5 mb-4">Kayıt</h3>
                        <label htmlFor="firstname" className="sr-only">İsim</label>
                        <input type="text" name="firstname" id="firstname" className="form-control mt-3"
                               placeholder="İsim" autoFocus onChange={this.handleChange}
                               ref={this.firstname}/>
                        <div ref={this.firstnameFeedback} className="invalid-feedback"/>

                        <label htmlFor="lastname" className="sr-only">Soyisim</label>
                        <input type="text" name="lastname" id="lastname" className="form-control mt-3"
                               placeholder="Soyisim" onChange={this.handleChange}
                               ref={this.lastname}/>
                        <div ref={this.lastnameFeedback} className="invalid-feedback"/>

                        <label htmlFor="email" className="sr-only">Email</label>
                        <input type="text" name="email" id="email" className="form-control mt-3"
                               placeholder="Email" onChange={this.handleChange}
                               ref={this.email}/>
                        <div ref={this.emailFeedback} className="invalid-feedback"/>

                        <label htmlFor="phone_number" className="sr-only">Telefon</label>
                        <input type="text" name="phone_number" id="phone_number" className="form-control mt-3"
                               placeholder="Telefon" onChange={this.handleChange}
                               ref={this.phone_number}/>
                        <div ref={this.phone_numberFeedback} className="invalid-feedback"/>

                        <label htmlFor="password" className="sr-only">Şifre</label>
                        <input type="password" name="password" id="password" className="form-control mt-3"
                               placeholder="Şifre" onChange={this.handleChange}
                               ref={this.password}/>
                        <div ref={this.passwordFeedback} className="invalid-feedback"/>

                        <button className="btn btn-lg btn-primary btn-block mt-3">Kaydol</button>
                        <div className="mt-3">
                            Zaten bir hesabın var mı? <Link to="/login">Giriş Yap</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

