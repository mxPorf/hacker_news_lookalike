import React from 'react'
import Loading from './Loading'
import {getStoriesByType} from '../utils/api'
import Post from './Post'

export default class Top extends React.Component{
  state = {
    newList: [],
    error: null
  }

  componentDidMount() {
    getStoriesByType('new')
      .then( (arr) => {
        this.setState({
          newList: arr,
          error: null
        })
      })
      .catch( (err) => {
        console.log('error: ', err);
        this.setState({
          newList: [],
          error: err
        })
      })
  }

  isLoading = () => {
    const {newList, error} = this.state
    return newList.length === 0 && error === null
  }

  render(){
    const {newList} = this.state
    return(
      <React.Fragment>
        {this.isLoading() && <Loading text='Loading'/>}
        {this.state.error && <p>{this.state.error}</p>}
        <div>
          <ul>
            {newList.map((article) => (
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
        {/* <pre>{JSON.stringify(newList, null, 2)}</pre> */}
      </React.Fragment>
    )
  }
}
