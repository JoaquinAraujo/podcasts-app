'use strict'

import 'isomorphic-fetch'

import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'

import Error from 'next/error'

export default class extends React.Component {
  static async getInitialProps ({ res }) {
    try {
      const reqChannels = await fetch('https://api.audioboom.com/channels/recommended')

      const { body: channels } = await reqChannels.json()

      return {
        statusCode: 200,
        channels
      }
    } catch (err) {
      res.statusCode = 503
      return {
        statusCode: 503,
        channels: null
      }
    }
  }

  render () {
    const { statusCode, channels } = this.props

    if (statusCode !== 200) {
      return (
        <Error statusCode={ statusCode } />
      )
    }

    return (
      <Layout title="Podcasts">
        <ChannelGrid channels={ channels } />
      </Layout>
    )
  }
}
