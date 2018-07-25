'use strict'

import 'isomorphic-fetch'

import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import PodcastList from '../components/PodcastList'

export default class extends React.Component {
  static async getInitialProps ({ query }) {
    const idChannel = query.id

    const [ reqChannel, reqAudio, reqSeries ] = await Promise.all(
      [
        fetch(`https://api.audioboom.com/channels/${idChannel}`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
      ]
    )

    const { body: { channel } } = await reqChannel.json()
    const { body: { audio_clips } } = await reqAudio.json()
    const { body: { channels } } = await reqSeries.json()

    return {
      channel,
      audio_clips,
      channels
    }
  }

  render () {
    const { channel, audio_clips, channels } = this.props

    return (
      <Layout title={ channel.title }>

        <h1>{ channel.title }</h1>

        <h2>Últimos Podcasts</h2>
        <PodcastList audio_clips={ audio_clips } />

        <h2>Series</h2>
        <ChannelGrid channels={ channels } />

        <style jsx>
          {
            `
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
