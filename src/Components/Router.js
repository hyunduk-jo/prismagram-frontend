import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from '../Routes/Auth';
import Feed from '../Routes/Feed';
import Upload from '../Routes/Upload';
import Search from '../Routes/Search';
import Profile from '../Routes/Profile';
import Post from '../Routes/Post';

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route path="/upload" component={Upload} />
    <Route path="/search" component={Search} />
    <Route path="/notifications" component={Post} />
    <Route path="/:username" component={Profile} />
    <Redirect from="*" to="/" />
  </Switch>
)
const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
)

const AppRouter = ({ isLoggedIn }) => isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />


AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}

export default AppRouter;