import React from 'react'
import Link from 'next/link'
import Conversion from '../components/Conversion'
import Head from 'next/head'

export default () => (
  <div>
    <Head>
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
      <style>{`
        html {
          background: url('../static/back.jpg') no-repeat center center fixed;
          background-size: cover;
          display: block;
          height: 800px;
          left: 0;
          position: fixed;
          right: 0;
        }
      `}</style>
    </Head>
    <div>
      <Conversion />
    </div>
  </div>
)
