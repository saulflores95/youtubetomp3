import React, { Component } from 'react'
import axios from 'axios'

export default class Conversion extends Component {
  converter() {
    console.log('youtue conversion starting...')
    axios.post('/conversion/convert').then((res) => {
      console.log(res)
    }).catch((err) => {  console.log(err) })
  }

  render() {
    return (
      <div>
        <h1>youtube to mp3</h1>
        <button onClick={this.converter.bind(this)}>Click to start</button>
      </div>
    )
  }
}
