import React from 'react'
import PropTypes from 'prop-types'
import toLocale from '../utils/date'
import {Link} from 'react-router-dom'
import {ThemeConsumer} from '../context/theme'

export default function Post({id, title, author, time, kids=null, url, title_size='normal'}) {
  return(
    <ThemeConsumer>
      { ({theme}) => (
        <React.Fragment>
          <h3 className={`h3-${title_size}`}> <a href={url} dangerouslySetInnerHTML={{__html: title}} className='title-link' /> </h3>
          <div> by&nbsp;
            <Link
            className={`post-link-${theme}`}
            to={{
              pathname: '/user',
              search: `id=${author}`
             }}>
               {author}
            </Link> on {toLocale(time)} with&nbsp;
            <Link
            className={`post-link-${theme}`}
            to={{
              pathname: '/comments',
              search: `id=${id}`
            }}>
              {kids !== null ? kids.length : 0}
            </Link> comments
          </div>
        </React.Fragment>
      )}
    </ThemeConsumer>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  kids: PropTypes.array,
  url: PropTypes.string,
  title_size: PropTypes.string
}
