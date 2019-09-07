import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LoginPage from '../components/LoginPage'


const AppRouter = () => (
    <Router>
        <div>
            <Switch>
                <Route path="/" component={LoginPage} />
            </Switch>
        </div>
    </Router>
)

export default AppRouter