'use strict'

import 'isomorphic-fetch'
import Link from 'next/link'

export default class extends React.Component {
  static async getInitialProps ({ query }) {
    const idPodcast = query.id

    const reqPodcast = await fetch(`https://api.audioboom.com/audio_clips/${idPodcast}.mp3`)

    const { body: { audio_clip } } = await reqPodcast.json()

    return {
      audio_clip
    }
  }

  render () {
    const { audio_clip } = this.props

    return (
      <div>
        <header>Podcasts</header>

        <div className='modal'>
          <div className='clip'>
            <nav>
              <Link href={`/channel?id=${audio_clip.channel.id}`}>
                <a className='close'>&lt; Volver</a>
              </Link>
            </nav>

            <picture>
              <div style={{ backgroundImage: `url(${audio_clip.urls.image || audio_clip.channel.urls.logo_image.original})` }} />
            </picture>

            <div className='player'>
              <h3>{ audio_clip.title }</h3>
              <h6>{ audio_clip.channel.title }</h6>
              <audio controls autoPlay={ true }>
                <source src={ audio_clip.urls.high_mp3 } type='audio/mpeg' />
              </audio>
            </div>
          </div>
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

              nav {
                background: none;
              }

              nav a {
                display: inline-block;
                padding: 15px;
                color: white;
                cursor: pointer;
                text-decoration: none;
              }

              .clip {
                display: flex;
                height: 100%;
                flex-direction: column;
                background: #8756ca;
                color: white;
              }

              picture {
                display: flex;
                align-items: center;
                justify-content: center;
                flex: 1 1;
                flex-direction: column;
                width: auto;
                padding: 10%;
              }

              picture div {
                width: 100%;
                height: 100%;
                background-position: 50% 50%;
                background-size: contain;
                background-repeat: no-repeat;
              }

              .player {
                padding: 30px;
                background: rgba(0,0,0,0.3);
                text-align: center;
              }

              h3 {
                margin: 0;
              }

              h6 {
                margin: 0;
                margin-top: 1em;
              }

              audio {
                margin-top: 2em;
                width: 100%;
              }

              .modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 99999;
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
