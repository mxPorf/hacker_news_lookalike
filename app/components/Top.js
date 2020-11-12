import React from 'react'
import Loading from './Loading'
import {getStoriesByType} from '../utils/api'
import Post from './Post'

export default class Top extends React.Component{
  state = {
    topList: [],
    error: null
  }

  componentDidMount() {
    getStoriesByType('top')
      .then( (arr) => {
        this.setState({
          topList: arr,
          error: null
        })
      })
      .catch( (err) => {
        console.log('error: ', err);
        this.setState({
          topList: [],
          error: err
        })
      })
  }

  isLoading = () => {
    const {topList, error} = this.state
    return topList.length === 0 && error === null
  }

  render(){
    const {topList} = this.state
    return(
      <React.Fragment>
        {this.isLoading() && <Loading text='Loading'/>}
        {this.state.error && <p>{this.state.error}</p>}
        <div>
          <ul>
            {topList.map((article) => (
              <li key={article.id}>
                <Post
                  id={article.id}
                  title={article.title}
                  author={article.by}
                  time={article.time}
                  kids={article.kids}
                  url={article.url}
                />
              </li>
            ))}
          </ul>
        </div>
        {/* <pre>{JSON.stringify(topList, null, 2)}</pre> */}
      </React.Fragment>
    )
  }
}
