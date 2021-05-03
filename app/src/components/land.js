//libraries
import React, { useState, useEffect } from "react"
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'

import { login as ll } from '../store/atoms'

import '../../assets/css/header.css'

function Land(props) {
    const [isLogin] = useRecoilState(ll)

    return (
        <header className="App-header">
            <div>
                {isLogin ? <div onClick={logout}>Logout</div> : <div onClick={toLogin}>Login</div>}
            </div>
        </header>
    )
}

export default Land