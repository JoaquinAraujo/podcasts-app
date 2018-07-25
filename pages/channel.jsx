'use strict'

import 'isomorphic-fetch'

import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import PodcastList from '../components/PodcastList'

import Error from 'next/error'

export default class extends React.Component {
  static async getInitialProps ({ res, query }) {
    try {
      const idChannel = query.id

      const [ reqChannel, reqAudio, reqSeries ] = await Promise.all(
        [
          fetch(`https://api.audioboom.com/channels/${idChannel}`),
          fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
          fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
        ]
      )

      if (reqChannel.status >= 404) {
        res.statusCode = reqChannel.status
        return {
          statusCode: reqChannel.status,
          channel: null,
          audio_clips: null,
          channels: null
        }
      }

      const { body: { channel } } = await reqChannel.json()
      const { body: { audio_clips } } = await reqAudio.json()
      const { body: { channels } } = await reqSeries.json()

      return {
        statusCode: 200,
        channel,
        audio_clips,
        channels
      }
    } catch (err) {
      res.statusCode = 503
      return {
        statusCode: 503,
        channel: null,
        audio_clips: null,
        channels: null
      }
    }
  }

  render () {
    const { statusCode, channel, audio_clips, channels } = this.props

    if (statusCode !== 200) {
      return (
        <Error statusCode={ statusCode } />
      )
    }

    return (
      <Layout title={ channel.title }>
        <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />

        <h1>{ channel.title }</h1>

        <h2>Últimos Podcasts</h2>
        <PodcastList audio_clips={ audio_clips } />

        {
          channels.length > 0 &&
          <div>
            <h2>Series</h2>
            <ChannelGrid channels={ channels } />
          </div>
        }

        <style jsx>
          {
            `
              .banner {
                width: 100%;
                padding-bottom: 25%;
                background-position: 50% 50%;
                background-size: cover;
                background-color: #aaa;
              }

              h1 {
                font-weight: 600;
                padding: 0 15px;
                margin: 15px 0;
              }

              h2 {
                padding: 5px;
                font-size: 0.9em;
                font-weight: 600;
                margin: 0;
              }

              h1, h2 {
                text-align: center;
              }
            `
          }
        </style>
      </Layout>
    )
  }
}
