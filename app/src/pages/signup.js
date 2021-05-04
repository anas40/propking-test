import React, { useState } from 'react';
import Axios from '../store/interceptor'
import Cookies from 'universal-cookie'
import { useHistory } from 'react-router-dom';
import { login as ll, promptLogin as pL } from '../store/atoms'

import { Link } from 'react-router-dom';
import '../assets/css/login.css'
import { useSetRecoilState,useRecoilState } from 'recoil';
const cookies = new Cookies();

function Signup() {
    const setLogin = useSetRecoilState(ll)
    const [promptLogin, setPromptLogin] = useRecoilState(pL)


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory();

    function login(event) {
        event.preventDefault()
        Axios.post('signup', { email, password }).then((data) => {
            cookies.set('jwt', data.data.token);
            setLogin(true)
            setPromptLogin(false)
            history.push('/')
        }).catch(error => {
            setPromptLogin(error.message)
            console.log(error)
        })
    }

    return (
        <div className="loginContainer">
            <form onSubmit={login} className="login-form">
                <h1>Signup</h1>
                <div className="form-input-material">
                    <input onChange={event => setEmail(event.target.value)} value={email} type="text" name="email" id="username" placeholder=" " required className="form-control-material" />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-input-material">
                    <input type="password" onChange={event => setPassword(event.target.value)} name="password" value={password} id="password" placeholder=" " required className="form-control-material" />
                    <label htmlFor="password">Password</label>
                </div>
                <button type="submit" className="btn btn-ghost">Signup</button>
                <Link to="/login">Login</Link>
            </form>
        </div>
    )
}

export default Signup;