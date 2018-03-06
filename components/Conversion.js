import React, { Component } from 'react'
import axios from 'axios'

export default class Conversion extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
   this.setState({value: event.target.value});
 }

  converter() {
    console.log('youtue conversion starting...')
    axios.post('/conversion/convert', {
      url: this.state.value
    }).then((res) => {
      console.log(res)
    }).catch((err) => {  console.log(err) })
  }

  render() {
    return (
      <div>
        <h1>youtube to mp3</h1>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <button onClick={this.converter.bind(this)}>Click to start</button>
      </div>
    )
  }
}
