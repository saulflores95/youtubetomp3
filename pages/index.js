import React from 'react'
import Link from 'next/link'
import Conversion from '../components/Conversion'
import Head from 'next/head'

export default () => (
  <div>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
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
