'use strict'

import Head from 'next/head'
import Link from 'next/link'

export default class Layout extends React.Component {
  render () {

    const { title, children } = this.props

    return (
      <div>
        <Head>
          <title>{ title }</title>
        </Head>

        <header>
          <Link href="/"><a>{ title }</a></Link>
        </header>

        { children }

        <style jsx>
          {
            `
              header {
                color: #fff;
                background: #8756ca;
                padding: 15px;
                text-align: center;
              }

              header a {
                color: #fff;
                text-decoration: none;
                font-weight: bold;
                text-transform: uppercase;
              }
            `
          }
        </style>

        <style jsx global>
          {
            `
              body {
                margin: 0;
                font-family: system-ui;
                background: white;
              }
            `
          }
        </style>
      </div>
    )
  }
}