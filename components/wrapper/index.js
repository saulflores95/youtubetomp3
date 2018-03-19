import React, { Component } from 'react'
import ReactGA from 'react-ga'
import Head from 'next/head'
import injectTapEventPlugin from 'react-tap-event-plugin'

export default class App extends Component {
  componentDidMount () {
    injectTapEventPlugin()
    ReactGA.initialize('UA-65601119-2')
    ReactGA.pageview(document.location.pathname)
  }
  render () {
    return (
      <div className='wrapperHeight'>
        <Head>
          <meta name='viewport' content='initial-scale=1.0, width=device-width maximum-scale=1.0, user-scalable=no' />
          <title>CimaP3</title>
          <meta name='description' content='Best YT to mp3 converter' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width maximum-scale=1.0, user-scalable=no' />
          <meta property='og:type' content='article' />
          <meta property='og:title' content='CimaP3' />
          <meta property='og:description' content='Best YT to mp3 converter' />
          <meta property='og:image' content='./static/back.jpg' />
          <meta property='og:image:width' content='640' />
          <meta property='og:image:height' content='442' />
          <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' />
          <style>
            {`
            body{
              background-color: white;
              width: 100%;
              height: 100%;
              margin: 0;
              top: 0;
              overflow-x: hidden;
              overflow-y: hidden;
              background-color: white;
              font-family: 'Montserrat', sans-serif;
              background: url('../static/back.jpg') no-repeat center center fixed;
              background-size: cover;

            }
            html {
              height: 100%;
              width: 100%;
              margin: 0;
              top: 0;
              box-sizing: border-box;
              overflow-y: hidden;
              font-family: 'Montserrat', sans-serif;
            }
            #__next {
              height: 100%;
            }
          `}
          </style>
        </Head>
        <div className='container'>
          <div className='content'>
            {this.props.children}
          </div>
        </div>
        <style jsx>
          {`
            .container {
              max-width: var(--site-width);
              margin:0 auto;
              overflow-y: hidden;
              overflow-x: hidden;
              height: 100%;
              position: fixed;
              width: 100%;
            }
            .footerF {
              height: 56px;
              width: 100%;
              bottom: 0px;
              left: 0px;
              position: fixed;
              z-index: 10000;
              margin-top: -56px;
            }
            .wrapperHeight {
              height: 100%;
            }
            .content {
              flex: 1;
              position: absolute;
              top: 69px;
              width: 100%;
              bottom: 0;
              padding-bottom: 56px;
              overflow-x: hidden;
              overflow-y: scroll;
              -webkit-overflow-scrolling: touch;
              height:calc(100% - 1px);
            }
            #header {
              height: 69px;
              position: fixed;
              width: 100%;
              top: 0;
              z-index: 999;
            }
            .leaflet-popup-content a {
              font-size: 16px !important;
            }
            .leaflet-popup-content-wrapper {
              background: red !important;
            }
            .leaflet-popup-content-wrapper, .leaflet-popup-tip {
              background: red !important;
            }
          `}
        </style>
      </div>
    )
  }
}
