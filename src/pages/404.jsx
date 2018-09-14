import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import giphyAPI from 'giphy-js-sdk-core'
import Content from '../components/atoms/Content'
import Button from '../components/atoms/Button'
import './404.scss'

// Famous last words:
// "It's just the 404 page so why not expose the dev API key"
const giphyClient = giphyAPI('LfXRwufRyt6PK414G2kKJBv3L8NdnxyR')
const tag = 'fail-cat'

export default class NotFound extends Component {
  state = { gif: '' }

  static propTypes = {
    location: PropTypes.object
  }

  componentDidMount() {
    this.getRandomGif()
  }

  getRandomGif() {
    giphyClient
      .random('gifs', { tag })
      .then(response => {
        const gif = response.data.images.original.mp4
        this.setState({ gif })
      })
      .catch(err => {
        return err
      })
  }

  handleClick = e => {
    e.preventDefault()
    this.getRandomGif()
  }

  render() {
    return (
      <Content className="content content--404">
        <h1>Shenanigans, page not found.</h1>
        <p>
          You might want to check the url, or{' '}
          <Link to={'/'}>go back to the homepage</Link>. Or just check out some
          cat fail gifs, entirely your choice.
        </p>

        <video className="gif" src={this.state.gif} autoPlay loop />

        <div>
          <Button onClick={this.handleClick}>
            Show me another cat fail gif
          </Button>
        </div>
      </Content>
    )
  }
}
