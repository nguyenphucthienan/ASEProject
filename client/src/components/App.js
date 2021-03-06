import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

import Header from './partials/Header';
import Footer from './partials/Footer';
import About from './About';
import Dashboard from './Dashboard';
import MyPostDashboard from './MyPostDashboard';
import PostNew from './posts/PostNew';
import PostDetail from './posts/PostDetail';
import AdminDashboard from './admin/AdminDashboard';
import AdminUserList from './admin/AdminUserList';
import PushNotificationNew from './admin/PushNotificationNew';
import NotFound from './NotFound';
import RequireAuth from './auth/requireAuth';
import RequireAdmin from './auth/requireAdmin';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="background-image flex-wrapper">
            <Header />
            <main>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/about" component={About} />
                <Route exact path="/my-posts" component={RequireAuth(MyPostDashboard)} />
                <Route exact path="/posts/new" component={RequireAuth(PostNew)} />
                <Route exact path="/posts/:id" component={PostDetail} />
                <Route exact path="/admin" component={RequireAdmin(AdminDashboard)} />
                <Route exact path="/admin/user-list" component={RequireAdmin(AdminUserList)} />
                <Route exact path="/admin/push-notification" component={RequireAdmin(PushNotificationNew)} />
                <Route exact path="/404" component={NotFound} />
                <Redirect from="*" to="/404" />
              </Switch>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, { fetchUser })(App);
