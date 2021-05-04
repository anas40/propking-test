//libraries
import React, { useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Cookies from 'universal-cookie'
import { useSetRecoilState } from 'recoil'

//components and pages
import Home from "./home.js"
import Login from './login.js'
import Signup from './signup.js'
import NotFound from './notfound.js'
import Header from '../components/header.js'
import Footer from '../components/footer.js'

import { login as ll } from '../store/atoms'

const cookies = new Cookies();

function Routes() {
    const setLogin = useSetRecoilState(ll)
    useEffect(() => {
        let token = cookies.get('jwt')
        if(token) setLogin(true)
    },[])
    return (
        <Router>
            <Header />
            <main>
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/" exact component={Home} />
                    <Route component={NotFound} />
                </Switch>
            </main>
            <Footer />
        </Router>
    )
}

export default Routes