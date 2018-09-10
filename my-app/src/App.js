import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      'items': []
    }
  }
  componentDidMount() {
    this.getItems();
  }
  getItems(){
    fetch('http://localhost:1111/data')
    .then(results => results.json())
    .then(results => this.setState({'items': results}));
  }
  render() {
    return (
       <table>
       <tbody>
    <tr className="header">
      <td>Name</td>
      <td className="description">Description</td>
      <td className="description">Default</td>
      <td className="description">Current</td>
    </tr>
        {this.state.items.map(function(item,index) {
          return (
    <tr key = {index}>
      <td className="name">{item.attributes.key}</td>
      <td className="description">{item.attributes.description}</td>
      <td className="description">{item.attributes.defaultValue}</td>
      <td className="current">{item.attributes.currentValue}</td>
    </tr>
          )
        })}
        </tbody>
      </table>
    );
  }
}

export default App;
