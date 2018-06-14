import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import {Notes} from "./components/Notes";
import {ToDo} from "./components/ToDo";
import {Calendar} from "./components/Calendar";

export default class App extends Component {
  displayName = App.name;

  render() {
    return (
      <Layout>
          <Route exact path='/' component={Home} />
          <Route path='/notes' component={Notes} />
          <Route path='/todo' component={ToDo} />
          <Route path='/calendar' component={Calendar} />
      </Layout>
    );
  }
}
