import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import BlogEntryGatePage from '../components/BlogEntryGatePage';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import SignUpPage from '../components/SignUpPage.jsx';


const AppRouter = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/journal" component={BlogEntryGatePage}/>
            <Route component={NotFoundPage} />
        </Switch>
    </Router>
)

export default AppRouter