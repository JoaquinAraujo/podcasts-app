'use strict'

import 'isomorphic-fetch'
import Link from 'next/link'

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
      <div>
        <header>PodCasts</header>

        <h1>{ channel.title }</h1>

        {
          channels.length > 0 &&
          <h2>Series</h2>
        }
        {
          channels.map(serie => (
            <div key={ serie.id }>{ serie.title }</div>
          ))
        }

        <h2>Últimos Podcasts</h2>

        <div className="audioClips">
          {
            audio_clips.map(clip => (
              <Link
                key={ clip.id }
                href={`/podcast?id=${ clip.id }`}
              >
                <a>{ clip.title }</a>
              </Link>
            ))
          }
        </div>

        <style jsx>
          {
            `
              header {
                color: #fff;
                background: #8756ca;
                padding: 15px;
                text-align: center;
              }

              .channels {
                display: grid;
                grid-gap: 15px;
                padding: 15px;
                grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
              }

              a.channel {
                display: block;
                margin-bottom: 0.5em;
                color: #333;
                text-decoration: none;
              }

              .channel img {
                border-radius: 3px;
                box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
                width: 100%;
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
                text-align: center;
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
