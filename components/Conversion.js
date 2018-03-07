import React, { Component } from 'react'
import axios from 'axios'
import { Container, Col, Row } from 'react-grid-system'

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
      let newWindow = window.open(res)
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <Container>
          <div className='conversion-container'>
            <h1 className='main-text'>What is the url?</h1>
            <input placeholder="url" type="text" value={this.state.value} onChange={this.handleChange} />
            <span className='input-highlight'></span>
            <button onClick={this.converter.bind(this)} className="btn sixth">start</button>
          </div>
        </Container>
        <style jsx>{`
          .conversion-container {
            padding:50px;
            margin-top:100px;
            background: rgba(255, 255, 255, 0.35);
            border-radius: 3px;
            box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
            top: 10px;
            left: 0;
            right: 0;
            z-index: 2;
          }

          .main-text {
            font-size: 100px;
            font-family: 'Montserrat';
            color: white;
          }

          .input-highlight {
            font-size: 30px;
            -webkit-user-select: none;
               -moz-user-select: none;
                -ms-user-select: none;
                    user-select: none;
            line-height: 70px;
            border-top: 3px solid white;
            position: absolute;
            left: 0;
            bottom: 0;
            max-width: 100%;
            height: 0;
            color: transparent;
            font-family: Roboto Slab, sans-serif;
            overflow: hidden;
          }

          .btn {
            box-sizing: border-box;
            appearance: none;
            background-color: transparent;
            border: 2px solid $red;
            border-radius: 0.6em;
            color: $red;
            cursor: pointer;
            display: flex;
            align-self: center;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1;
            margin: 20px;
            padding: 1.2em 2.8em;
            text-decoration: none;
            text-align: center;
            text-transform: uppercase;
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
            }

          input {
            height: 60px;
            width: 100%;
            min-width: 100%;
            padding: 0;
            border-radius: 0;
            line-height: 70px;
            background-color: transparent;
            color: white;
            font-size: 30px;
            border: none;
            outline: none;
            border-bottom: 3px solid #333333;
            font-family: Roboto Slab, sans-serif;
          }

          input:focus + .input-highlight {
            border-top: 3px solid #fbc91b;
          }

        `}</style>
      </div>
    )
  }
}
