//libraries
import React, { useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Cookies from 'universal-cookie'
import { useRecoilValue, useSetRecoilState } from 'recoil'

//components and pages
import Home from "./Home"
import Login from './Login.js'

import { login as ll } from '../store/atoms'

//css

const cookies = new Cookies();


function Routes() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path="/" exact component={Home} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </div>
    )
}

export default Routes