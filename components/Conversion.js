import React, { Component } from 'react' //import react and component var
import axios from 'axios' //import axios for http request
import { Row, Col, Container, Hidden } from 'react-grid-system' //import contianer for grid system
import swal from 'sweetalert2'
import ReactGA from 'react-ga'
import RaisedButton from 'material-ui/RaisedButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Paper from 'material-ui/Paper';

export default class Conversion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      openMenu: false,
      show: false,
      currentFormat: 'audio'
    }  //value comes from url input field
    this.handleChange = this.handleChange.bind(this)
    this.handleAlert = this.handleAlert.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }
  //using componentDidMount to initialize google analitycs server
  componentDidMount () {
    injectTapEventPlugin()
    ReactGA.initialize('UA-65601119-2')
    ReactGA.pageview(document.location.pathname)
  }
  //Set state for value if users types on input field
  handleChange (event) {
    this.setState({value: event.target.value})
  }
  //Alternate states for models of succes or error
  handleAlert() {
    this.setState({
      show: !this.state.show
    })
  }

  handleClick (event) {
    // This prevents ghost click.
    event.preventDefault()
    this.setState({
      openMenu: true,
      anchorEl: event.currentTarget,
    })
  }

  handleRequestClose() {
    this.setState({
      openMenu: false,
    })
  }
  //extracts filename from response headers
  extractFilename(filename) {
    let pattern = /filename[^;=\n]*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/i
    var arr = pattern.exec(filename)
    return arr[3]
  }

  menuClicked(event, value) {
    this.setState({
      currentFormat: value
    })
    console.log(this.state.currentFormat)
  }
  //sends request to convert file on the clouse
  converter () {
    swal({
      title: 'Conversion in progress',
      text: 'please wait...',
      onOpen: () => {
         swal.showLoading()
       },
       showConfirmButton: false
    })
    console.log('youtue conversion starting...')
    axios.get(`/conversion/${this.state.currentFormat}-convert`, { // sends GET request to express server
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
      swal({
        title: 'Conversion Finished',
        type: 'success',
        showConfirmButton: true
      })
      link.click() //simulating user click
    }).catch((err) => {
      console.log(err)
      swal({
        title: 'ERROR',
        text: 'It appears you did not copy the url correctly or title has uncompatiable characters ',
        type: 'error',
        showConfirmButton: true
      })
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
            <Hidden xs sm>
              <h1 className='main-text'>What is the url?</h1>
            </Hidden>
            <div className="text-input">
              <input onChange={this.handleChange} type="text" id="input1" placeholder="Try typing something in here!" />
              <label htmlFor="input1">URL: </label>
              <MuiThemeProvider>
                <div>
                  <RaisedButton
                    onClick={this.handleClick}
                    label={this.state.currentFormat}
                  />
                  <Popover
                    open={this.state.openMenu}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                  >
                    <Menu onChange={this.menuClicked.bind(this)}>
                      <MenuItem value='audio' primaryText='Audio' />
                      <MenuItem value='video' primaryText='Video' />
                    </Menu>
                  </Popover>
                </div>
              </MuiThemeProvider>
            </div>
            <Row>
              <Col sm={6} md={6}>
                <button onClick={this.converter.bind(this)} className='btn sixth'>start</button>
              </Col>
            </Row>
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
          .btn {
            box-sizing: border-box;
            appearance: none;
            background-color: transparent;
            border: 2px solid $red;
            border-radius: 0.6em;
            color: white;
            cursor: pointer;
            display: flex;
            align-self: center;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1;
            margin-top: 20px;
            padding: 1.2em 2.8em;
            text-decoration: none;
            text-align: center;
            text-transform: uppercase;
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
          }
          .text-input {
            position: relative;
            margin-top: 50px;
          }
          .text-input input[type="text"] {
            display: inline-block;
            width: 80%;
            height: 40px;
            -webkit-box-sizing: border-box;
                    box-sizing: border-box;
            outline: none;
            border: 1px solid lightgray;
            border-radius: 3px;
            padding: 10px 10px 10px 100px;
            -webkit-transition: all 0.1s ease-out;
            transition: all 0.1s ease-out;
          }
          .text-input input[type="text"] + label {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            height: 40px;
            line-height: 40px;
            color: white;
            border-radius: 3px 0 0 3px;
            padding: 0 20px;
            background: black;
            -webkit-transform: translateZ(0) translateX(0);
                    transform: translateZ(0) translateX(0);
            -webkit-transition: all 0.3s ease-in;
            transition: all 0.3s ease-in;
            -webkit-transition-delay: 0.2s;
                    transition-delay: 0.2s;
          }
          .text-input input[type="text"]:focus + label {
            -webkit-transform: translateY(-120%) translateX(0%);
                    transform: translateY(-120%) translateX(0%);
            border-radius: 3px;
            -webkit-transition: all 0.1s ease-out;
            transition: all 0.1s ease-out;
          }
          .text-input input[type="text"]:focus {
            padding: 10px;
            -webkit-transition: all 0.3s ease-out;
            transition: all 0.3s ease-out;
            -webkit-transition-delay: 0.2s;
                    transition-delay: 0.2s;
          }
        `}</style>
      </div>
    )
  }
}
