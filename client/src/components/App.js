import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

import Header from './Header';
import Footer from './Footer';
import About from './About';
import Landing from './Landing';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="flex-wrapper">
            <Header />
            <main>
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/about" component={About} />
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