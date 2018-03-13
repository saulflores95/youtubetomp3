import React, { Component } from 'react' //import react and component var
import axios from 'axios' //import axios for http request
import { Container } from 'react-grid-system' //import contianer for grid system

export default class Conversion extends Component {
  constructor (props) {
    super(props)
    this.state = {value: ''}  //value comes from url input field
    this.handleChange = this.handleChange.bind(this)
  }
  //Set state for value if users types on input field
  handleChange (event) {
    this.setState({value: event.target.value})
  }
  //extracts filename from response headers
  extractFilename(filename) {
    let pattern = /filename[^;=\n]*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/i
    var arr = pattern.exec(filename)
    return arr[3]
  }
  //sends request to convert file on the clouse
  converter () {
    console.log('youtue conversion starting...')
    axios.get('/conversion/convert', { // sends GET request to express server
      params: {
        url: this.state.value //sets url as response parametors
      },
      responseType: 'blob', //sets response file type
    }).then((res) => {
      const filename = this.extractFilename(res.headers['content-disposition']) //extract filename from response headers
      const url = window.URL.createObjectURL(new Blob([res.data])) //creates tmp URL for blob data to enable download
      const link = document.createElement('a') //generates fake link element in DOM
      link.href = url //setting href source to tmpURL variable called url
      link.setAttribute('download', filename) // setting url behavier when clicked
      document.body.appendChild(link)
      link.click() //simulating user click
    }).catch((err) => {
      console.log(err)
    })
  }
  //sends request to store file on server and then downloads it on browser
  converterLocal() {
    console.log('youtue conversion starting...')
    axios.get('/conversion/convert-local', {
      params: {
        url: this.state.value //sets url as response parametors
      }
    }).then((res) => {
      let downloadUrl = `../static/${res.data}.mp3` //sets path of mp3
      const link = document.createElement('a') //generates fake link element in DOM
      link.href = downloadUrl //setting href source to tmpURL variable called downloadUrl
      link.setAttribute('download', `${res.data}.mp3`) //setting href source to tmpURL variable called url
      document.body.appendChild(link) // setting url behavier when clicked
      link.click() //simulating user click
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {
    return (
      <div>
        <Container>
          <div className='conversion-container'>
            <h1 className='main-text'>What is the url?</h1>
            <input placeholder='url' type='text' value={this.state.value} onChange={this.handleChange} />
            <span className='input-highlight' />
            <button onClick={this.converter.bind(this)} className='btn sixth'>start</button>
            <button onClick={this.converterLocal.bind(this)} className='btn sixth'>local</button>
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
