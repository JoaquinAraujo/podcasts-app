'use strict'

export default class extends React.Component {
  render () {
    return (
      <div>
        <h1>Hello World!</h1>
        <p>Welcome to PodCastsApp</p>

        <img src="/static/logo.png" alt="Joaquin Araujo" />

        <style jsx>
          {
            `
              h1, p {
                color: #051726;
              }

              img {
                max-width: 180px;
              }
            `
          }
        </style>
      </div>
    )
  }
}
