import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import BlogEntryGatePage from '../components/BlogEntryGatePage'
import LoginPage from '../components/LoginPage'
import NotFoundPage from '../components/NotFoundPage'


const AppRouter = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route path="/journal" component={BlogEntryGatePage}/>
            <Route component={NotFoundPage} />
        </Switch>
    </Router>
)

export default AppRouter