import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "./../axiosClient.js";
import { useStateContext } from "../contexts/contextprovider";

export default function Register() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const { setUser, setToken } = useStateContext();

    const Submit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        axiosClient
            .post("/register", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
    };
    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">Create A New Account</h1>
                <form onSubmit={Submit}>
                    <input type="name" ref={nameRef} placeholder="Name" />
                    <input type="email" ref={emailRef} placeholder="Email" />
                    <input
                        type="password"
                        ref={passwordRef}
                        placeholder="Password"
                    />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Already have an Account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
