'use strict'

import Link from 'next/link'

export default class PodcastList extends React.Component {
  render () {

    const { audio_clips } = this.props

    return (
      <div className="audioClips">
        {
          audio_clips.map(clip => (
            <Link
              key={ clip.id }
              href={`/podcast?id=${ clip.id }`}
            >
              <a className="audioClip">
                <img
                  src={ clip.urls.post_image.original }
                  alt={ clip.title }
                />
                <h2>{ clip.title }</h2>
              </a>
            </Link>
          ))
        }

        <style jsx>
          {
            `
              .audioClips {
                display: grid;
                grid-gap: 15px;
                padding: 15px;
                grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
              }

              a.audioClip {
                display: block;
                margin-bottom: 0.5em;
                color: #333;
                text-decoration: none;
              }

              .audioClip img {
                border-radius: 3px;
                box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
                width: 100%;
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
      </div>
    )
  }
}
