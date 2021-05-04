//libraries
import React, { useState, useEffect } from "react"
import { useRecoilState } from 'recoil'
import { useHistory } from 'react-router-dom';
import { login as ll } from '../store/atoms'
import Cookies from 'universal-cookie'

import '../assets/css/header.css'
import Axios from '../store/interceptor'

const cookies = new Cookies();

function Header() {
    const [isLogin,setLogin] = useRecoilState(ll)
    const history = useHistory();

    function logout() {
        Axios.get('signout').then(() => {
            cookies.remove('jwt')
            setLogin(false)
            history.push('/')
        }).catch(error => {
            console.log(error.message)
        })
    }
    function toLogin() {
        history.push('/login')
    }
    return (
        <header>
            <div className="nav">
                {isLogin ? <div onClick={logout}>Logout</div> : <div onClick={toLogin}>Login</div>}
            </div>
        </header>
    )
}

export default Header