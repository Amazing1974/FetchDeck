import React, { Component } from 'react';
import store from './store';
import FetchDeckApp from './components/FetchDeckApp';
import 'react-native-gesture-handler';

export default class App extends Component {
  render() {
    return (
      <FetchDeckApp store={store} />
    )
  }
}